/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useJiraServers } from './index';
import { jiraServersMock } from './mocks/jiraServers.mock';

const { ApiProxy } = pluginLib;

describe('testing useJiraServers hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(jiraServersMock);

        const useJiraServersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() => useJiraServers(useJiraServersProps));

        await waitForNextUpdate();
        await expect(result.current.jiraServers).toEqual(['jira-server-1', 'jira-server-2']);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useJiraServersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() => useJiraServers(useJiraServersProps));

        await waitForNextUpdate();
        await expect(result.current.jiraServers).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
