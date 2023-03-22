/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useGroovyLibrariesWithTheirBranches } from './index';
import { groovyLibrariesMock } from './mocks/groovyLibraries.mock';
import { groovyLibrariesBranchesMock } from './mocks/groovyLibrariesBranches.mock';
const { ApiProxy } = pluginLib;

describe('testing useGroovyLibrariesWithTheirBranches hook', () => {
    it('should return groovy libraries with their branches list', async () => {
        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('codebases')) {
                return Promise.resolve(groovyLibrariesMock);
            }

            if (url.includes('codebasebranches')) {
                return Promise.resolve(groovyLibrariesBranchesMock);
            }
        });

        const useGroovyLibrariesWithTheirBranchesProps = {
            namespace: 'test-namespace',
            defaultOption: { label: 'test-label', value: 'test-value' },
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useGroovyLibrariesWithTheirBranches(useGroovyLibrariesWithTheirBranchesProps)
        );

        await waitForNextUpdate();
        await expect(result.current.groovyLibraries).toEqual([
            {
                option: { value: 'test-groovy', label: 'test-groovy' },
                branches: [{ specBranchName: 'master', metadataBranchName: 'test-groovy-master' }],
            },
            {
                option: { value: 'test-lib', label: 'test-lib' },
                branches: [
                    {
                        specBranchName: 'master',
                        metadataBranchName: 'test-groovy-master',
                    },
                ],
            },
        ]);
        await expect(result.current.error).toBeNull();
    });
    it('should throw an error after async request if something goes wrong', async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useGroovyLibrariesWithTheirBranchesProps = {
            namespace: 'test-namespace',
            defaultOption: { label: 'test-label', value: 'test-value' },
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useGroovyLibrariesWithTheirBranches(useGroovyLibrariesWithTheirBranchesProps)
        );
        await waitForNextUpdate();
        await expect(result.current.groovyLibraries).toEqual([
            { option: { label: 'test-label', value: 'test-value' }, branches: [] },
        ]);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
