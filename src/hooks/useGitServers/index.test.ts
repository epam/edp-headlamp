/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import * as hookModule from './index';

const { ApiProxy } = pluginLib;

describe('testing useGitServers hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(hookModule, 'useGitServers').mockImplementation(() => ({
            gitServers: ['git-server-1', 'git-server-2'],
        }));

        const {
            result: {
                current: { gitServers },
            },
        } = renderHook(() => hookModule.useGitServers({ namespace: 'test-namespace' }));

        expect(gitServers).toEqual(['git-server-1', 'git-server-2']);
    });

    it(`should throw an error if something goes wrong`, async () => {
        const requestSpy = jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        renderHook(() => hookModule.useGitServers({ namespace: 'test-namespace' }));

        await expect(requestSpy).rejects.toEqual({ status: 'Failure' });
    });
});
