import { jest } from '@jest/globals';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { pluginLib } from '../../../plugin.globals';
import { DeepPartial } from '../../../types/global';
import { streamResults } from './index';

const { ApiProxy } = pluginLib;

const executeMockState = () => {
    const resourcesState: DeepPartial<KubeObjectInterface>[] = [];
    const errorState: any = {};

    return { resourcesState, errorState };
};

const cancelCallback = jest.fn().mockImplementation(() => {});
describe('streamResults', () => {
    it('should emit initial values', async () => {
        let { resourcesState, errorState } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockResolvedValue({
            kind: 'TestResourceKindList',
            items: [
                {
                    apiVersion: 'v2.edp.epam.com',
                    kind: 'TestResourceKind',
                    spec: {
                        testProp: 'test-prop-1-value-after-first-request',
                    },
                    metadata: {
                        uid: 'test-prop-1-uid',
                    },
                },
            ],
            metadata: {
                resourceVersion: 'resource-version-after-first-request',
            },
        });

        streamResults(
            'test-resource-kind-url',
            resources => {
                resourcesState = resources;
            },
            error => {
                errorState = error;
            },
            {
                testParam: 'test-param-value',
            }
        );
        await new Promise(process.nextTick);

        expect(resourcesState).toEqual([
            {
                apiVersion: 'v2.edp.epam.com',
                kind: 'TestResourceKind',
                spec: { testProp: 'test-prop-1-value-after-first-request' },
                metadata: { uid: 'test-prop-1-uid' },
            },
        ]);
        expect(Object.keys(errorState)).toHaveLength(0);
    });
    it('should emit updated values', async () => {
        let { resourcesState, errorState } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockResolvedValue({
            kind: 'TestResourceKindList',
            items: [
                {
                    apiVersion: 'v2.edp.epam.com',
                    kind: 'TestResourceKind',
                    spec: {
                        testProp: 'mock-object-1-test-prop-value-1',
                    },
                    metadata: {
                        uid: 'mock-object-1-uid',
                        resourceVersion: 1,
                    },
                },
            ],
            metadata: {
                resourceVersion: 'resource-version-1',
            },
        });

        jest.spyOn(ApiProxy, 'stream').mockImplementation(
            (watchUrl, update): { cancel: () => void; getSocket: () => WebSocket } => {
                update({
                    type: 'ADDED',
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'mock-object-2-test-prop-value-1',
                        },
                        metadata: {
                            uid: 'mock-object-2-uid',
                            resourceVersion: 1,
                        },
                    },
                });

                update({
                    type: 'MODIFIED',
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'mock-object-1-test-prop-value-2',
                        },
                        metadata: {
                            uid: 'mock-object-1-uid',
                            resourceVersion: 2,
                        },
                    },
                });

                update({
                    type: 'DELETED',
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        metadata: {
                            uid: 'mock-object-1-uid',
                        },
                    },
                });

                return { cancel: cancelCallback, getSocket: () => null };
            }
        );

        streamResults(
            'test-resource-kind-url',
            resources => {
                resourcesState = resources;
            },
            error => {
                errorState = error;
            },
            {
                testParam: 'test-param-value',
            }
        );

        await new Promise(process.nextTick);

        expect(resourcesState).toEqual([
            {
                apiVersion: 'v2.edp.epam.com',
                kind: 'TestResourceKind',
                spec: { testProp: 'mock-object-2-test-prop-value-1' },
                metadata: { uid: 'mock-object-2-uid', resourceVersion: 1 },
                actionType: 'ADDED',
            },
        ]);

        expect(Object.keys(errorState)).toHaveLength(0);
    });
    it('should fire error callback if something goes wrong', async () => {
        let { resourcesState, errorState } = executeMockState();
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        streamResults(
            'test-resource-kind-url',
            resources => {
                resourcesState = resources;
            },
            error => {
                errorState = error;
            },
            {
                testParam: 'test-param-value',
            }
        );
        await new Promise(process.nextTick);

        expect(Object.keys(resourcesState)).toHaveLength(0);
        expect(errorState).toEqual({ status: 'Failure' });
    });
    it('should stop stream on cancel', async () => {
        let { resourcesState, errorState } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockResolvedValue({
            kind: 'TestResourceKindList',
            items: [
                {
                    apiVersion: 'v2.edp.epam.com',
                    kind: 'TestResourceKind',
                    spec: {
                        testProp: 'mock-object-1-test-prop-value-1',
                    },
                    metadata: {
                        uid: 'mock-object-1-uid',
                        resourceVersion: 1,
                    },
                },
            ],
            metadata: {
                resourceVersion: 'resource-version-1',
            },
        });

        jest.spyOn(ApiProxy, 'stream').mockImplementation(
            (watchUrl, update): { cancel: () => void; getSocket: () => WebSocket } => {
                update({
                    type: 'ADDED',
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'mock-object-2-test-prop-value-1',
                        },
                        metadata: {
                            uid: 'mock-object-2-uid',
                            resourceVersion: 1,
                        },
                    },
                });
                update({
                    type: 'MODIFIED',
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'mock-object-1-test-prop-value-2',
                        },
                        metadata: {
                            uid: 'mock-object-1-uid',
                            resourceVersion: 2,
                        },
                    },
                });

                return { cancel: cancelCallback, getSocket: () => null };
            }
        );

        const cancelStream = streamResults(
            'test-resource-kind-url',
            resources => {
                resourcesState = resources;
            },
            error => {
                errorState = error;
            },
            {
                testParam: 'test-param-value',
            }
        );
        await new Promise(process.nextTick);

        expect(resourcesState).toEqual([
            {
                apiVersion: 'v2.edp.epam.com',
                kind: 'TestResourceKind',
                spec: { testProp: 'mock-object-1-test-prop-value-2' },
                metadata: { uid: 'mock-object-1-uid', resourceVersion: 2 },
                actionType: 'MODIFIED',
            },
            {
                apiVersion: 'v2.edp.epam.com',
                kind: 'TestResourceKind',
                spec: { testProp: 'mock-object-2-test-prop-value-1' },
                metadata: { uid: 'mock-object-2-uid', resourceVersion: 1 },
                actionType: 'ADDED',
            },
        ]);

        cancelStream();
        expect(cancelCallback).toHaveBeenCalled();
        expect(Object.keys(errorState)).toHaveLength(0);
    });
});
