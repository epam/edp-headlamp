/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useAutotestsWithBranches } from './index';
import { codebaseBranchesMock } from './mocks/codebaseBranches.mock';
import { codebasesMock } from './mocks/codebases.mock';
const { ApiProxy } = pluginLib;

describe('testing useAutotestsWithBranches hook', () => {
    it('should return autotests with their branches list', async () => {
        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('codebases')) {
                return Promise.resolve(codebasesMock);
            }

            if (url.includes('codebasebranches')) {
                return Promise.resolve(codebaseBranchesMock);
            }
        });

        const useAutotestsWithBranchesProps = {
            namespace: 'test-namespace',
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useAutotestsWithBranches(useAutotestsWithBranchesProps)
        );

        await waitForNextUpdate();
        await expect(result.current.autotests).toEqual([
            { name: 'autotest-autotest', branches: ['master'] },
            { name: 'test-autotest', branches: ['master'] },
        ]);
        await expect(result.current.error).toBeNull();
    });
    it('should throw an error after async request if something goes wrong', async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useAutotestsWithBranchesProps = {
            namespace: 'test-namespace',
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useAutotestsWithBranches(useAutotestsWithBranchesProps)
        );

        await waitForNextUpdate();
        await expect(result.current.autotests).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
