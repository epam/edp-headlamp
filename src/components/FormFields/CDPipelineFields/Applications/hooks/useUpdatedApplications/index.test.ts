/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { pluginLib } from '../../../../../../plugin.globals';
import { useUpdatedApplications } from './index';
import { codebaseBranchesMock } from './mocks/codebaseBranches.mock';
import { codebasesMock } from './mocks/codebases.mock';
import { expectedFormStateFieldsMock } from './mocks/expectedFormStateFields.mock';
import { expectedUpdatedApplicationsMock } from './mocks/expectedUpdatedApplications.mock';
const { ApiProxy } = pluginLib;

const executeMockState = () => {
    const formState = {}; // react-hook-form state

    const setValue = (name: string, value: any): void => {
        formState[name] = value;
    };

    return {
        formState,
        setValue,
    };
};

describe('testing useUpdatedApplications hook', () => {
    it('should return updated applications list, also it should update form state with new values', async () => {
        const { formState, setValue } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('codebases')) {
                return Promise.resolve(codebasesMock);
            }

            if (url.includes('codebasebranches')) {
                return Promise.resolve(codebaseBranchesMock);
            }
        });

        const useUpdatedApplicationsProps = {
            setValue,
            values: {
                namespaceFieldValue: 'edp-delivery-vp-delivery-dev',
                applicationsFieldValue: ['test-app-2', 'test-application'],
                applicationsToPromoteValue: ['test-app-2', 'test-application'],
                applicationsBranchesFieldValue: ['test-app-2-master', 'test-application-master'],
            },
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useUpdatedApplications(useUpdatedApplicationsProps)
        );

        await waitForNextUpdate();
        await expect(result.current.applications).toEqual(expectedUpdatedApplicationsMock);
        await expect(result.current.error).toBeNull();
        expect(formState).toEqual(expectedFormStateFieldsMock);
    });
    it('should throw an error after async request if something goes wrong', async () => {
        const { formState, setValue } = executeMockState();

        jest.spyOn(ApiProxy, 'request').mockRejectedValue({ status: 'Failure' });

        const useUpdatedApplicationsProps = {
            setValue,
            values: {
                namespaceFieldValue: 'edp-delivery-vp-delivery-dev',
                applicationsFieldValue: ['test-app-2', 'test-application'],
                applicationsToPromoteValue: ['test-app-2', 'test-application'],
                applicationsBranchesFieldValue: ['test-app-2-master', 'test-application-master'],
            },
        };

        const { result, waitForNextUpdate } = renderHook(() =>
            useUpdatedApplications(useUpdatedApplicationsProps)
        );

        await waitForNextUpdate();
        await expect(result.current.applications).toHaveLength(0);
        await expect(result.current.error).toEqual({ status: 'Failure' });
        await expect(Object.keys(formState)).toHaveLength(0);
    });
});
