/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import { useNamespaces } from './index';
import { namespacesMock } from './mocks/namespaces.mock';

const { ApiProxy } = pluginLib;

describe('testing useNamespaces hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(ApiProxy, 'request').mockResolvedValue(namespacesMock);

        const { result, waitForNextUpdate } = renderHook(() => useNamespaces());

        await waitForNextUpdate();
        await expect(result.current.namespaces).toEqual(['namespace-1', 'namespace-2']);
        await expect(result.current.error).toBeNull();
    });

    it(`should throw an error if something goes wrong`, async () => {
        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const { result, waitForNextUpdate } = renderHook(() => useNamespaces());

        await waitForNextUpdate();
        await expect(result.current.namespaces).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
    });
});
