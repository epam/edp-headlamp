/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useJenkinsSlaves } from './index';
import { jenkinsMock } from './mocks/jenkins.mock';

const { ApiProxy } = pluginLib;

describe('testing useJenkinsSlaves hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(jenkinsMock);

        const useJenkinsSlavesProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useJenkinsSlaves(useJenkinsSlavesProps)
        );

        await waitForNextUpdate();
        await expect(result.current.jenkinsSlaves).toEqual(['jenkins-agent-1', 'jenkins-agent-2']);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useJenkinsSlavesProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useJenkinsSlaves(useJenkinsSlavesProps)
        );

        await waitForNextUpdate();
        await expect(result.current.jenkinsSlaves).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
