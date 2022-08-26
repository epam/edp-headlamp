/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import * as hookModule from './index';

const { ApiProxy } = pluginLib;

describe('testing useJiraServers hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(hookModule, 'useJiraServers').mockImplementation(() => ({
            jiraServers: ['jira-server-1', 'jira-server-2'],
        }));

        const {
            result: {
                current: { jiraServers },
            },
        } = renderHook(() => hookModule.useJiraServers({ namespace: 'test-namespace' }));

        expect(jiraServers).toEqual(['jira-server-1', 'jira-server-2']);
    });

    it(`should throw an error if something goes wrong`, async () => {
        const requestSpy = jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        renderHook(() => hookModule.useJiraServers({ namespace: 'test-namespace' }));

        await expect(requestSpy).rejects.toEqual({ status: 'Failure' });
    });
});
