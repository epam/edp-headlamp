/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import * as hookModule from './index';

const { ApiProxy } = pluginLib;

describe('testing useNamespaces hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(hookModule, 'useNamespaces').mockImplementation(() => ({
            namespaces: ['namespace-1', 'namespace-2'],
        }));

        const {
            result: {
                current: { namespaces },
            },
        } = renderHook(() => hookModule.useNamespaces());

        expect(namespaces).toEqual(['namespace-1', 'namespace-2']);
    });

    it(`should throw an error if something goes wrong`, async () => {
        const requestSpy = jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        renderHook(() => hookModule.useNamespaces());

        await expect(requestSpy).rejects.toEqual({ status: 'Failure' });
    });
});
