/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { useCreateCDPipeline } from './index';
import { cdPipelineMock } from './mocks/cdPipeline.mock';
import { stageQAMock } from './mocks/stageQA.mock';
import { stageSitMock } from './mocks/stageSit.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCDPipelineKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});
EDPCDPipelineStageKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

describe('testing useCreateCDPipeline hook', () => {
    it(`should successfully create cd pipeline and stages`, async () => {
        let cdPipelineCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            cdPipelineCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const stages = [stageSitMock, stageQAMock];

        const CDPipelineRequestSpy = jest
            .spyOn(EDPCDPipelineKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(cdPipelineMock);

        const stageRequestSpy = jest
            .spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'post')
            .mockResolvedValueOnce(stages[0])
            .mockResolvedValueOnce(stages[1]);

        const {
            result: {
                current: { createCDPipeline },
            },
        } = renderHook(() => useCreateCDPipeline(onCreate, onError));

        const createCDPipelinePromise = createCDPipeline(cdPipelineMock, stages);
        await expect(createCDPipelinePromise).resolves.toEqual(cdPipelineMock);

        await expect(CDPipelineRequestSpy).toHaveBeenCalledWith(cdPipelineMock);
        await expect(stageRequestSpy).toHaveBeenCalledWith(stages[0]);
        await expect(stageRequestSpy).toHaveBeenCalledWith(stages[1]);

        expect(cdPipelineCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`should throw an error if something goes wrong`, async () => {
        let cdPipelineCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            cdPipelineCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCDPipelineKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createCDPipeline },
            },
        } = renderHook(() => useCreateCDPipeline(onCreate, onError));

        const createCDPipelinePromise = createCDPipeline(cdPipelineMock, [
            stageSitMock,
            stageQAMock,
        ]);
        await expect(createCDPipelinePromise).rejects.toEqual({ status: 'Failure' });

        await expect(requestSpy).toHaveBeenCalledWith(cdPipelineMock);

        expect(cdPipelineCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
