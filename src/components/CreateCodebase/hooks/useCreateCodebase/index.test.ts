/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createSecretExample } from '../../../../configs/k8s-resource-examples/resources/secret';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { pluginLib } from '../../../../plugin.globals';
import { useCreateCodebase } from './index';
import {
    cloneStrategyCodebaseAuthDataMock,
    cloneStrategyCodebaseDataMock,
    cloneStrategySecret,
} from './mocks/cloneStrategyCodebaseDataMock';
import { createStrategyCodebaseDataMock } from './mocks/createStrategyCodebaseDataMock';

const {
    K8s: { secret: SecretKubeObject },
} = pluginLib;

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPCodebaseKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

describe('testing useCreateCodebase hook', () => {
    it(`should successfully create codebase, shouldn't create secret`, async () => {
        let codebaseCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const requestSpy = jest.spyOn(EDPCodebaseKubeObject.apiEndpoint, 'post').mockResolvedValue({
            codebase: createStrategyCodebaseDataMock,
            secretCreated: false,
        });

        const {
            result: {
                current: { createCodebase },
            },
        } = renderHook(() => useCreateCodebase(onCreate, onError));

        const createCodebasePromise = createCodebase(createStrategyCodebaseDataMock, null);
        await expect(createCodebasePromise).resolves.toEqual({
            codebase: createStrategyCodebaseDataMock,
            secretCreated: false,
        });

        await expect(requestSpy).toHaveBeenCalledWith(createStrategyCodebaseDataMock);

        expect(codebaseCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it('should successfully create secret and codebase', async () => {
        let codebaseCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const codebaseRequestSpy = jest
            .spyOn(EDPCodebaseKubeObject.apiEndpoint, 'post')
            .mockReturnValue({
                codebase: cloneStrategyCodebaseDataMock,
                secretCreated: true,
            });
        const secretRequestSpy = jest
            .spyOn(SecretKubeObject.default.apiEndpoint, 'post')
            .mockReturnValue(cloneStrategySecret);

        const {
            result: {
                current: { createCodebase },
            },
        } = renderHook(() => useCreateCodebase(onCreate, onError));

        const createCodebasePromise = createCodebase(
            cloneStrategyCodebaseDataMock,
            cloneStrategyCodebaseAuthDataMock
        );
        await expect(createCodebasePromise).resolves.toEqual({
            codebase: cloneStrategyCodebaseDataMock,
            secretCreated: true,
        });
        await expect(codebaseRequestSpy).toHaveBeenCalledWith(cloneStrategyCodebaseDataMock);

        const {
            metadata: { name, namespace },
        } = cloneStrategyCodebaseDataMock;
        const { repositoryLogin, repositoryPasswordOrApiToken } = cloneStrategyCodebaseAuthDataMock;

        await expect(secretRequestSpy).toHaveBeenCalledWith(
            createSecretExample(name, namespace, repositoryLogin, repositoryPasswordOrApiToken)
        );

        expect(codebaseCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`shouldn't create codebase if secret creation goes wrong`, async () => {
        let codebaseCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const codebaseRequestSpy = jest
            .spyOn(EDPCodebaseKubeObject.apiEndpoint, 'post')
            .mockReturnValue(cloneStrategyCodebaseDataMock);
        const secretRequestSpy = jest
            .spyOn(SecretKubeObject.default.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure', secretCreated: false });

        const {
            result: {
                current: { createCodebase },
            },
        } = renderHook(() => useCreateCodebase(onCreate, onError));

        const {
            metadata: { name, namespace },
        } = cloneStrategyCodebaseDataMock;

        const { repositoryLogin, repositoryPasswordOrApiToken } = cloneStrategyCodebaseAuthDataMock;

        const createCodebasePromise = createCodebase(
            cloneStrategyCodebaseDataMock,
            cloneStrategyCodebaseAuthDataMock
        );

        await expect(createCodebasePromise).rejects.toEqual({
            status: 'Failure',
            secretCreated: false,
        });

        await expect(secretRequestSpy).toHaveBeenCalledWith(
            createSecretExample(name, namespace, repositoryLogin, repositoryPasswordOrApiToken)
        );
        await expect(codebaseRequestSpy).not.toHaveBeenCalled();
        expect(codebaseCreated).toBe(false);
        expect(hasError).toBe(true);
    });
    it(`should delete secret if codebase creation goes wrong`, async () => {
        let codebaseCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            codebaseCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const codebaseRequestSpy = jest
            .spyOn(EDPCodebaseKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure', secretCreated: false });
        const secretRequestSpy = jest
            .spyOn(SecretKubeObject.default.apiEndpoint, 'post')
            .mockReturnValue(cloneStrategySecret);
        const secretRequestDeleteSpy = jest.spyOn(SecretKubeObject.default.apiEndpoint, 'delete');

        const {
            result: {
                current: { createCodebase },
            },
        } = renderHook(() => useCreateCodebase(onCreate, onError));

        const {
            metadata: { name, namespace },
        } = cloneStrategyCodebaseDataMock;

        const { repositoryLogin, repositoryPasswordOrApiToken } = cloneStrategyCodebaseAuthDataMock;

        const createCodebasePromise = createCodebase(
            cloneStrategyCodebaseDataMock,
            cloneStrategyCodebaseAuthDataMock
        );

        await expect(createCodebasePromise).rejects.toEqual({
            status: 'Failure',
            secretCreated: false,
        });

        await expect(secretRequestSpy).toHaveBeenCalledWith(
            createSecretExample(name, namespace, repositoryLogin, repositoryPasswordOrApiToken)
        );
        await expect(codebaseRequestSpy).toHaveBeenCalledWith(cloneStrategyCodebaseDataMock);
        await expect(secretRequestDeleteSpy).toHaveBeenCalled();
        expect(codebaseCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
