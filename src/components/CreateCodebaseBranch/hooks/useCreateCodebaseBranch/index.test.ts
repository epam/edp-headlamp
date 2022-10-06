/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { useCreateCodebaseBranch } from './index';
import { branchDataMock } from './mocks/branchData.mock';
import { defaultBranchDataMock } from './mocks/defaultBranchData.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCodebaseBranchKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});
EDPCodebaseBranchKubeObject.apiEndpoint.put = jest.fn().mockImplementation(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

describe('testing useCreateCodebase hook', () => {
    it(`should successfully create codebase branch`, async () => {
        let codebaseBranchCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseBranchCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCodebaseBranchKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(branchDataMock);

        const {
            result: {
                current: { createCodebaseBranch },
            },
        } = renderHook(() => useCreateCodebaseBranch(onCreate, onError));

        const createCodebaseBranchPromise = createCodebaseBranch(branchDataMock);
        await expect(createCodebaseBranchPromise).resolves.toEqual(branchDataMock);

        await expect(requestSpy).toHaveBeenCalledWith(branchDataMock);

        expect(codebaseBranchCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`should successfully create codebase release branch and update default branch`, async () => {
        let codebaseBranchCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseBranchCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const codebaseBranchPostRequestSpy = jest
            .spyOn(EDPCodebaseBranchKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(branchDataMock);

        const codebaseBranchPutRequestSpy = jest
            .spyOn(EDPCodebaseBranchKubeObject.apiEndpoint, 'put')
            .mockResolvedValue(defaultBranchDataMock);

        const {
            result: {
                current: { createCodebaseBranch },
            },
        } = renderHook(() => useCreateCodebaseBranch(onCreate, onError));

        const createCodebaseBranchPromise = createCodebaseBranch(
            branchDataMock,
            defaultBranchDataMock
        );
        await expect(createCodebaseBranchPromise).resolves.toEqual(branchDataMock);

        await expect(codebaseBranchPostRequestSpy).toHaveBeenCalledWith(branchDataMock);
        await expect(codebaseBranchPutRequestSpy).toHaveBeenCalledWith(defaultBranchDataMock);

        expect(codebaseBranchCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`should throw an error if something goes wrong`, async () => {
        let codebaseBranchCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseBranchCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest
            .spyOn(EDPCodebaseBranchKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createCodebaseBranch },
            },
        } = renderHook(() => useCreateCodebaseBranch(onCreate, onError));

        const createCodebaseBranchPromise = createCodebaseBranch(branchDataMock);
        await expect(createCodebaseBranchPromise).rejects.toEqual({ status: 'Failure' });

        await expect(requestSpy).toHaveBeenCalledWith(branchDataMock);

        expect(codebaseBranchCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
