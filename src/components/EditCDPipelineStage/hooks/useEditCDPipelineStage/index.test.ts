/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { useEditCDPipelineStage } from './index';
import { stageSitMock } from './mocks/stageSit.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCDPipelineStageKubeObject.apiEndpoint.put = jest.fn().mockImplementation(() => {});

describe('testing useEditCDPipelineStage hook', () => {
    it(`should successfully edit cd pipeline stage`, async () => {
        let CDPipelineStageUpdated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            CDPipelineStageUpdated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCDPipelineStageKubeObject.apiEndpoint, 'put')
            .mockResolvedValue(stageSitMock);

        const {
            result: {
                current: { editCDPipelineStage },
            },
        } = renderHook(() => useEditCDPipelineStage(onCreate, onError));

        const editCDPipelineStagePromise = editCDPipelineStage(stageSitMock);
        await expect(editCDPipelineStagePromise).resolves.toEqual(stageSitMock);

        await expect(requestSpy).toHaveBeenCalledWith(stageSitMock);

        expect(CDPipelineStageUpdated).toBe(true);
        expect(hasError).toBe(false);
    });
});
