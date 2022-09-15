/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useGitServers } from './index';
import { gitServersMock } from './mocks/gitServers.mock';

const { ApiProxy } = pluginLib;

describe('testing useGitServers hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(gitServersMock);

        const useGitServersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() => useGitServers(useGitServersProps));

        await waitForNextUpdate();
        await expect(result.current.gitServers).toEqual(['git-server-1', 'git-server-2']);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useGitServersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() => useGitServers(useGitServersProps));

        await waitForNextUpdate();
        await expect(result.current.gitServers).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
