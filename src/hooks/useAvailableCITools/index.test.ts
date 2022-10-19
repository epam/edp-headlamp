/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useAvailableCITools } from './index';
import { edpComponentsMock } from './mocks/edpComponents.mock';

const { ApiProxy } = pluginLib;

describe('testing useAvailableCITools hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(edpComponentsMock);

        const useEDPComponentsProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useAvailableCITools(useEDPComponentsProps)
        );

        await waitForNextUpdate();
        expect(result.current.availableCITools).toEqual(['jenkins', 'tekton']);
        expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useEDPComponentsProps = { namespace: 'test-namespace' };
        const { result, waitForNextUpdate } = renderHook(() =>
            useAvailableCITools(useEDPComponentsProps)
        );

        await waitForNextUpdate();
        expect(result.current.availableCITools).toHaveLength(0);
        expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
