/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useCodebasesByType } from './index';
import { codebasesMock } from './mocks/codebases.mock';

const { ApiProxy } = pluginLib;

describe('testing useCodebasesByType hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(codebasesMock);

        const useCodebasesByTypeProps = {
            namespace: 'test-namespace',
            codebaseType: 'application',
        };
        const { result, waitForNextUpdate } = renderHook(() =>
            useCodebasesByType(useCodebasesByTypeProps)
        );

        await waitForNextUpdate();
        await expect(result.current.applications).toEqual([
            {
                apiVersion: 'v2.edp.epam.com/v1',
                kind: 'Codebase',
                metadata: { name: 'vp-test-python', namespace: 'edp-delivery-vp-dev' },
            },
        ]);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useCodebasesByTypeProps = {
            namespace: 'test-namespace',
            codebaseType: 'application',
        };
        const { result, waitForNextUpdate } = renderHook(() =>
            useCodebasesByType(useCodebasesByTypeProps)
        );

        await waitForNextUpdate();
        await expect(result.current.applications).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
