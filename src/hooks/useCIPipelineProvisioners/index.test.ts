/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useCIPipelineProvisioners } from './index';
import { CIPipelineProvisionersMock } from './mocks/CIPipelineProvisioners.mock';

const { ApiProxy } = pluginLib;

describe('testing useCIPipelineProvisioners hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(CIPipelineProvisionersMock);

        const useCIPipelineProvisionersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useCIPipelineProvisioners(useCIPipelineProvisionersProps)
        );

        await waitForNextUpdate();
        await expect(result.current.CIPipelineProvisioners).toEqual(['default']);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useCIPipelineProvisionersProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useCIPipelineProvisioners(useCIPipelineProvisionersProps)
        );

        await waitForNextUpdate();
        await expect(result.current.CIPipelineProvisioners).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
