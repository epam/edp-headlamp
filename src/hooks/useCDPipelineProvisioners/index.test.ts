/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useCDPipelineProvisioners } from './index';
import { JenkinsMock } from './mocks/jenkins.mock';

const { ApiProxy } = pluginLib;

describe('testing useCDPipelineProvisioners hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(JenkinsMock);

        const useCDPipelineProvisionersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useCDPipelineProvisioners(useCDPipelineProvisionersProps)
        );

        await waitForNextUpdate();
        await expect(result.current.CDPipelineProvisioners).toEqual(['default']);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useCDPipelineProvisionersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useCDPipelineProvisioners(useCDPipelineProvisionersProps)
        );

        await waitForNextUpdate();
        await expect(result.current.CDPipelineProvisioners).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
