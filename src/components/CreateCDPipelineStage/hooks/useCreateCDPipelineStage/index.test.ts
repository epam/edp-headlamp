/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { useCreateCDPipelineStage } from './index';
import { stageSitMock } from './mocks/stageSit.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCDPipelineStageKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

describe('testing useCreateCDPipelineStage hook', () => {
    it(`should successfully create cd pipeline stage`, async () => {
        let stageCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            stageCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        const stageRequestSpy = jest
            .spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(stageSitMock);

        const {
            result: {
                current: { createCDPipelineStage },
            },
        } = renderHook(() => useCreateCDPipelineStage(onCreate, onError));

        const createCDPipelineStagePromise = createCDPipelineStage(stageSitMock);
        await expect(createCDPipelineStagePromise).resolves.toEqual(stageSitMock);

        await expect(stageRequestSpy).toHaveBeenCalledWith(stageSitMock);

        expect(stageCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`should throw an error if something goes wrong`, async () => {
        let stageCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            stageCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createCDPipelineStage },
            },
        } = renderHook(() => useCreateCDPipelineStage(onCreate, onError));

        const createCDPipelineStagePromise = createCDPipelineStage(stageSitMock);

        await expect(createCDPipelineStagePromise).rejects.toEqual({ status: 'Failure' });

        await expect(requestSpy).toHaveBeenCalledWith(stageSitMock);

        expect(stageCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
