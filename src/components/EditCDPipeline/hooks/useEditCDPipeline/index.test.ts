/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { useEditCDPipeline } from './index';
import { CDPipelineMock } from './mocks/CDPipeline.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCDPipelineKubeObject.apiEndpoint.put = jest.fn().mockImplementation(() => {});

describe('testing useEditCDPipeline hook', () => {
    it(`should successfully edit cd pipeline`, async () => {
        let CDPipelineUpdated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            CDPipelineUpdated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCDPipelineKubeObject.apiEndpoint, 'put')
            .mockResolvedValue(CDPipelineMock);

        const {
            result: {
                current: { editCDPipeline },
            },
        } = renderHook(() => useEditCDPipeline(onCreate, onError));

        const editCDPipelinePromise = editCDPipeline(CDPipelineMock);
        await expect(editCDPipelinePromise).resolves.toEqual(CDPipelineMock);

        await expect(requestSpy).toHaveBeenCalledWith(CDPipelineMock);

        expect(CDPipelineUpdated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`should throw an error if something goes wrong`, async () => {
        let CDPipelineUpdated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            CDPipelineUpdated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCDPipelineKubeObject.apiEndpoint, 'put')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { editCDPipeline },
            },
        } = renderHook(() => useEditCDPipeline(onCreate, onError));

        const editCDPipelinePromise = editCDPipeline(CDPipelineMock);
        await expect(editCDPipelinePromise).rejects.toEqual({ status: 'Failure' });

        await expect(requestSpy).toHaveBeenCalledWith(CDPipelineMock);

        expect(CDPipelineUpdated).toBe(false);
        expect(hasError).toBe(true);
    });
});
