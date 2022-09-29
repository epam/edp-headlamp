import { jest } from '@jest/globals';
import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { pluginLib } from '../../../plugin.globals';
import { DeepPartial } from '../../../types/global';
import { streamResult } from './index';

const { ApiProxy } = pluginLib;

const executeMockState = () => {
    const resourceState: DeepPartial<KubeObjectInterface> = {};
    const errorState: any = {};

    return { resourceState, errorState };
};

const cancelCallback = jest.fn().mockImplementation(() => {});

describe('streamResult', () => {
    it('should emit initial value', async () => {
        let { resourceState, errorState } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockResolvedValue({
            apiVersion: 'v2.edp.epam.com',
            kind: 'TestResourceKind',
            spec: {
                testProp: 'test-prop-value-after-first-request',
            },
        });

        streamResult(
            'test-resource-kind-url',
            'test-resource-name',
            resource => {
                resourceState = { ...resource };
            },
            error => {
                errorState = error;
            }
        );
        await new Promise(process.nextTick);

        expect(resourceState).toEqual({
            apiVersion: 'v2.edp.epam.com',
            kind: 'TestResourceKind',
            spec: {
                testProp: 'test-prop-value-after-first-request',
            },
        });
        expect(Object.keys(errorState)).toHaveLength(0);
    });
    it('should emit updated value', async () => {
        let { resourceState, errorState } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockResolvedValue({
            apiVersion: 'v2.edp.epam.com',
            kind: 'TestResourceKind',
            spec: {
                testProp: 'test-prop-value-after-first-request',
            },
        });

        jest.spyOn(ApiProxy, 'stream').mockImplementation(
            (watchUrl, update): { cancel: () => void; getSocket: () => WebSocket } => {
                update({
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'test-prop-value-after-first-stream-message',
                        },
                    },
                });

                return { cancel: cancelCallback, getSocket: () => null };
            }
        );

        streamResult(
            'test-resource-kind-url',
            'test-resource-name',
            resource => {
                resourceState = { ...resource };
            },
            error => {
                errorState = error;
            }
        );

        await new Promise(process.nextTick);

        expect(resourceState).toEqual({
            apiVersion: 'v2.edp.epam.com',
            kind: 'TestResourceKind',
            spec: {
                testProp: 'test-prop-value-after-first-stream-message',
            },
        });
        expect(Object.keys(errorState)).toHaveLength(0);
    });
    it('should fire error callback if something goes wrong', async () => {
        let { resourceState, errorState } = executeMockState();
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        streamResult(
            'test-resource-kind-url',
            'test-resource-name',
            resource => {
                resourceState = { ...resource };
            },
            error => {
                errorState = error;
            }
        );
        await new Promise(process.nextTick);

        expect(Object.keys(resourceState)).toHaveLength(0);
        expect(errorState).toEqual({ status: 'Failure' });
    });
    it('should stop stream on cancel', async () => {
        let { resourceState, errorState } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockResolvedValue({
            apiVersion: 'v2.edp.epam.com',
            kind: 'TestResourceKind',
            spec: {
                testProp: 'test-prop-value-after-first-request',
            },
        });

        jest.spyOn(ApiProxy, 'stream').mockImplementation(
            (watchUrl, update): { cancel: () => void; getSocket: () => WebSocket } => {
                update({
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'test-prop-value-after-first-stream-message',
                        },
                    },
                });
                update({
                    object: {
                        apiVersion: 'v2.edp.epam.com',
                        kind: 'TestResourceKind',
                        spec: {
                            testProp: 'test-prop-value-after-first-stream-message-2',
                        },
                    },
                });

                return { cancel: cancelCallback, getSocket: () => null };
            }
        );

        const cancelStream = streamResult(
            'test-resource-kind-url',
            'test-resource-name',
            resource => {
                resourceState = { ...resource };
            },
            error => {
                errorState = error;
            }
        );
        await new Promise(process.nextTick);

        expect(resourceState).toEqual({
            apiVersion: 'v2.edp.epam.com',
            kind: 'TestResourceKind',
            spec: {
                testProp: 'test-prop-value-after-first-stream-message-2',
            },
        });
        cancelStream();
        expect(cancelCallback).toHaveBeenCalled();
        expect(Object.keys(errorState)).toHaveLength(0);
    });
});
