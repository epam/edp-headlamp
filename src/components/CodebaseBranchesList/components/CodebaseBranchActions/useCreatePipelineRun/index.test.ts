/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { PipelineRun } from '../../../../../k8s/PipelineRun';
import { createRandomFiveSymbolString } from '../../../../../utils/createRandomFiveSymbolString';
import { useCreatePipelineRun } from './index';
import { pipelineRunMock } from './mocks/pipelineRun.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

PipelineRun.apiEndpoint.post = jest.fn().mockImplementation(() => {});

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing useCreatePipelineRun hook', () => {
    it('should successfully create PipelineRun resource', async () => {
        let pipelineRunCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            pipelineRunCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        const pipelineRunRequestSpy = jest
            .spyOn(PipelineRun.apiEndpoint, 'post')
            .mockResolvedValue(pipelineRunMock);

        const {
            result: {
                current: { createPipelineRun },
            },
        } = renderHook(() => useCreatePipelineRun(onCreate, onError));

        const randomPostfix = createRandomFiveSymbolString();

        const createPipelineRunPromise = createPipelineRun({
            namespace: 'test-namespace',
            codebaseData: {
                codebaseName: 'test-codebase-name',
                codebaseBuildTool: 'test-build-tool',
                codebaseVersioningType: 'test-versioning-type',
                codebaseType: 'test-codebase-type',
                codebaseFramework: 'test-framework',
            },
            codebaseBranchName: 'test-codebase-branch-name',
            gitServerData: {
                gitHost: 'test-git-host',
                gitUser: 'test-git-user',
                sshPort: 123,
                nameSshKeySecret: 'test-ssh-key-secret',
            },
            randomPostfix,
        });

        await expect(createPipelineRunPromise).resolves.toEqual(pipelineRunMock);
        expect(pipelineRunRequestSpy).toHaveBeenCalledWith(pipelineRunMock);

        expect(pipelineRunCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`shouldn't create Application if something goes wrong`, async () => {
        let pipelineRunCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            pipelineRunCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        const pipelineRunRequestSpy = jest
            .spyOn(PipelineRun.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createPipelineRun },
            },
        } = renderHook(() => useCreatePipelineRun(onCreate, onError));

        const randomPostfix = createRandomFiveSymbolString();
        const createPipelineRunPromise = createPipelineRun({
            namespace: 'test-namespace',
            codebaseData: {
                codebaseName: 'test-codebase-name',
                codebaseBuildTool: 'test-build-tool',
                codebaseVersioningType: 'test-versioning-type',
                codebaseType: 'test-codebase-type',
                codebaseFramework: 'test-framework',
            },
            codebaseBranchName: 'test-codebase-branch-name',
            gitServerData: {
                gitHost: 'test-git-host',
                gitUser: 'test-git-user',
                sshPort: 123,
                nameSshKeySecret: 'test-ssh-key-secret',
            },
            randomPostfix,
        });

        await expect(createPipelineRunPromise).rejects.toEqual({ status: 'Failure' });
        expect(pipelineRunRequestSpy).toHaveBeenCalledWith(pipelineRunMock);

        expect(pipelineRunCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
