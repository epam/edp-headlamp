/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EnrichedApplication } from '../../../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPGitServer/types';
import { useApplicationCRUD } from './index';
import { expectedApplicationOutputMock } from './mocks/application.mock';
import { CDPipelineMock } from './mocks/CDPipeline.mock';
import { CDPipelineStageMock } from './mocks/CDPipelineStage.mock';
import { enrichedApplicationMock } from './mocks/enrichedApplication.mock';
import { gitServerMock } from './mocks/gitServer.mock';
import { gitServersMock } from './mocks/gitServers.mock';
import { imageStreamMock } from './mocks/imageStream.mock';

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
        const applicationPostRequestSpy = jest
            .spyOn(ApplicationKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(expectedApplicationOutputMock);

        const {
            result: {
                current: { createApplication },
            },
        } = renderHook(() => useApplicationCRUD({ gitServers: gitServersMock.items }));

        const createApplicationPromise = createApplication({
            CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
            currentCDPipelineStage:
                CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
            enrichedApplication: enrichedApplicationMock as unknown as EnrichedApplication,
            imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
            imageTag: 'test-image-tag',
            gitServer: gitServerMock as EDPGitServerKubeObjectInterface,
        });

        await expect(createApplicationPromise).resolves.toEqual(expectedApplicationOutputMock);
        expect(applicationPostRequestSpy).toHaveBeenCalledWith(expectedApplicationOutputMock);
    });
    it(`shouldn't create Application if something goes wrong`, async () => {
        const applicationPostRequestSpy = jest
            .spyOn(ApplicationKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createApplication },
            },
        } = renderHook(() => useApplicationCRUD({ gitServers: gitServersMock.items }));

        const createApplicationPromise = createApplication({
            CDPipeline: CDPipelineMock as EDPCDPipelineKubeObjectInterface,
            currentCDPipelineStage:
                CDPipelineStageMock as unknown as EDPCDPipelineStageKubeObjectInterface,
            enrichedApplication: enrichedApplicationMock as unknown as EnrichedApplication,
            imageStream: imageStreamMock as EDPCodebaseImageStreamKubeObjectInterface,
            imageTag: 'test-image-tag',
            gitServer: gitServerMock as EDPGitServerKubeObjectInterface,
        });

        await expect(createApplicationPromise).rejects.toEqual({ status: 'Failure' });
        expect(applicationPostRequestSpy).toHaveBeenCalledWith(expectedApplicationOutputMock);
    });
});
