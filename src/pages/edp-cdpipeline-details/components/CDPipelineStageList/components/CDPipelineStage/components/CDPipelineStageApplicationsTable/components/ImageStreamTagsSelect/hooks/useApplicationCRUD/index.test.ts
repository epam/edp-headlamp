/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { pluginLib } from '../../../../../../../../../../../../plugin.globals';
import { useApplicationCRUD } from './index';
import { applicationMock } from './mocks/application.mock';
import { gerritsMock } from './mocks/gerrits.mock';

const { ApiProxy } = pluginLib;

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

ApplicationKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing useApplicationCRUD hook', () => {
    it('should successfully create Application resource', async () => {
        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('gerrits')) {
                return Promise.resolve(gerritsMock);
            }
        });

        const applicationPostRequestSpy = jest
            .spyOn(ApplicationKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(applicationMock);

        const {
            result: {
                current: { createApplication },
            },
        } = renderHook(() => useApplicationCRUD());

        const createApplicationPromise = createApplication({
            pipelineName: 'test-pipeline-name',
            stageData: {
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Stage',
                metadata: {
                    name: 'test-pipeline-name-test-stage-name',
                    uid: '84dfeba1-bc42-4d1b-ab1f-473ebdf0fdf3',
                },
                spec: {
                    name: 'test-stage-name',
                },
            } as unknown as EDPCDPipelineStageKubeObjectInterface,
            appName: 'test-app-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            namespace: 'test-namespace',
            versioningType: 'edp',
        });

        await expect(createApplicationPromise).resolves.toEqual(applicationMock);
        expect(applicationPostRequestSpy).toHaveBeenCalledWith(applicationMock);
    });
    it(`shouldn't create Application if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('gerrits')) {
                return Promise.resolve(gerritsMock);
            }
        });

        const applicationPostRequestSpy = jest
            .spyOn(ApplicationKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createApplication },
            },
        } = renderHook(() => useApplicationCRUD());

        const createApplicationPromise = createApplication({
            pipelineName: 'test-pipeline-name',
            stageData: {
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Stage',
                metadata: {
                    name: 'test-pipeline-name-test-stage-name',
                    uid: '84dfeba1-bc42-4d1b-ab1f-473ebdf0fdf3',
                },
                spec: {
                    name: 'test-stage-name',
                },
            } as unknown as EDPCDPipelineStageKubeObjectInterface,
            appName: 'test-app-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            namespace: 'test-namespace',
            versioningType: 'edp',
        });

        await expect(createApplicationPromise).rejects.toEqual({ status: 'Failure' });
        expect(applicationPostRequestSpy).toHaveBeenCalledWith(applicationMock);
    });
});
