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
EDPCDPipelineKubeObject.apiEndpoint.delete = jest.fn().mockImplementation(() => {});
EDPCDPipelineStageKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});
EDPCDPipelineStageKubeObject.apiEndpoint.delete = jest.fn().mockImplementation(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

const stages = [stageSitMock, stageQAMock];

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
    it(`should delete created cd pipeline if some of the stages were failed to create`, async () => {
        let cdPipelineCreated: boolean = false;
        let stagesCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            cdPipelineCreated = true;
            stagesCreated = true;
        };
        const onError = (): void => {
            hasError = true;
            stagesCreated = false;
        };
        const CDPipelinePostRequestSpy = jest
            .spyOn(EDPCDPipelineKubeObject.apiEndpoint, 'post')
            .mockReturnValue(cdPipelineMock);
        const CDPipelineDeleteRequestSpy = jest.spyOn(
            EDPCDPipelineKubeObject.apiEndpoint,
            'delete'
        );
        jest.spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'post').mockRejectedValueOnce({
            status: 'Failure',
            stagesFailed: true,
        });

        const {
            result: {
                current: { createCDPipeline },
            },
            waitForNextUpdate,
        } = renderHook(() => useCreateCDPipeline(onCreate, onError));

        createCDPipeline(cdPipelineMock, stages);
        await waitForNextUpdate();

        expect(CDPipelinePostRequestSpy).toHaveBeenCalled();

        expect(CDPipelineDeleteRequestSpy).toHaveBeenCalled();

        expect(cdPipelineCreated).toBe(false);
        expect(hasError).toBe(true);
        expect(stagesCreated).toBe(false);
    });
    it(`should delete created cd pipeline and created stages if some of the stages were failed to create`, async () => {
        let cdPipelineCreated: boolean = false;
        let stagesCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            cdPipelineCreated = true;
            stagesCreated = true;
        };
        const onError = (): void => {
            hasError = true;
            stagesCreated = false;
        };
        const CDPipelinePostRequestSpy = jest
            .spyOn(EDPCDPipelineKubeObject.apiEndpoint, 'post')
            .mockReturnValue(cdPipelineMock);
        const CDPipelineDeleteRequestSpy = jest.spyOn(
            EDPCDPipelineKubeObject.apiEndpoint,
            'delete'
        );
        jest.spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'post').mockResolvedValueOnce(
            stages[0]
        );
        jest.spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'post').mockRejectedValueOnce({
            status: 'Failure',
            stagesFailed: true,
        });
        const CDPipelineStageDeleteRequestSpy = jest.spyOn(
            EDPCDPipelineStageKubeObject.apiEndpoint,
            'delete'
        );

        const {
            result: {
                current: { createCDPipeline },
            },
            waitForNextUpdate,
        } = renderHook(() => useCreateCDPipeline(onCreate, onError));

        createCDPipeline(cdPipelineMock, stages);
        await waitForNextUpdate();

        expect(CDPipelinePostRequestSpy).toHaveBeenCalled();

        expect(CDPipelineDeleteRequestSpy).toHaveBeenCalled();
        expect(CDPipelineStageDeleteRequestSpy).toHaveBeenCalledWith(
            stages[0].metadata.namespace,
            stages[0].metadata.name
        );

        expect(cdPipelineCreated).toBe(false);
        expect(hasError).toBe(true);
        expect(stagesCreated).toBe(false);
    });
});
