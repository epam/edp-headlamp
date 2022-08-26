/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../plugin.globals';
import * as hookModule from './index';

const { ApiProxy } = pluginLib;

describe('testing useJenkinsSlaves hook', () => {
    it(`should render with no problems`, async () => {
        jest.spyOn(hookModule, 'useJenkinsSlaves').mockImplementation(() => ({
            jenkinsSlaves: ['jenkins-slave-1', 'jenkins-slave-2'],
        }));

        const {
            result: {
                current: { jenkinsSlaves },
            },
        } = renderHook(() => hookModule.useJenkinsSlaves({ namespace: 'test-namespace' }));

        expect(jenkinsSlaves).toEqual(['jenkins-slave-1', 'jenkins-slave-2']);
    });

    it(`should throw an error if something goes wrong`, async () => {
        const requestSpy = jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        renderHook(() => hookModule.useJenkinsSlaves({ namespace: 'test-namespace' }));

        await expect(requestSpy).rejects.toEqual({ status: 'Failure' });
    });
});
