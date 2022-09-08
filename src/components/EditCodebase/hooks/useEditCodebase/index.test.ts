/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { useEditCodebase } from './index';
import { createStrategyCodebaseDataMock } from './mocks/createStrategyCodebaseDataMock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCodebaseKubeObject.apiEndpoint.put = jest.fn().mockImplementation(() => {});

describe('testing useEditCodebase hook', () => {
    it(`should successfully edit codebase`, async () => {
        let codebaseUpdated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseUpdated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest.spyOn(EDPCodebaseKubeObject.apiEndpoint, 'put').mockResolvedValue({
            codebase: createStrategyCodebaseDataMock,
            secretCreated: false,
        });

        const {
            result: {
                current: { editCodebase },
            },
        } = renderHook(() => useEditCodebase(onCreate, onError));

        const editCodebasePromise = editCodebase(createStrategyCodebaseDataMock);
        await expect(editCodebasePromise).resolves.toEqual({
            codebase: createStrategyCodebaseDataMock,
            secretCreated: false,
        });

        await expect(requestSpy).toHaveBeenCalledWith(createStrategyCodebaseDataMock);

        expect(codebaseUpdated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`should throw an error if something goes wrong`, async () => {
        let codebaseUpdated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseUpdated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest.spyOn(EDPCodebaseKubeObject.apiEndpoint, 'put').mockRejectedValue({
            status: 'Failure',
        });

        const {
            result: {
                current: { editCodebase },
            },
        } = renderHook(() => useEditCodebase(onCreate, onError));

        const editCodebasePromise = editCodebase(createStrategyCodebaseDataMock);
        await expect(editCodebasePromise).rejects.toEqual({ status: 'Failure' });

        await expect(requestSpy).toHaveBeenCalledWith(createStrategyCodebaseDataMock);

        expect(codebaseUpdated).toBe(false);
        expect(hasError).toBe(true);
    });
});
