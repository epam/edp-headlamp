/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { EDPGitServerKubeObject } from '../../../../k8s/EDPGitServer';
import { pluginLib } from '../../../../plugin.globals';
import { useCreateGitServer } from './index';
import { gitServerMock, gitServerSecretMock } from './mocks/gitServer.mock';

const {
    K8s: { secret: SecretKubeObject },
} = pluginLib;

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

EDPGitServerKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

afterEach(() => {
    jest.clearAllMocks();
});

describe('testing useCreateGitServer hook', () => {
    it('should successfully create secret and git server', async () => {
        let gitServerCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            gitServerCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const gitServerRequestSpy = jest
            .spyOn(EDPGitServerKubeObject.apiEndpoint, 'post')
            .mockReturnValue({
                gitServer: gitServerMock,
                secretCreated: true,
            });
        const gitServerSecretRequestSpy = jest
            .spyOn(SecretKubeObject.default.apiEndpoint, 'post')
            .mockReturnValue(gitServerSecretMock);

        const {
            result: {
                current: { createGitServer },
            },
        } = renderHook(() => useCreateGitServer(onCreate, onError));

        const createGitServerPromise = createGitServer(gitServerMock, gitServerSecretMock);
        await expect(createGitServerPromise).resolves.toEqual({
            gitServer: gitServerMock,
            secretCreated: true,
        });
        await expect(gitServerRequestSpy).toHaveBeenCalledWith(gitServerMock);

        await expect(gitServerSecretRequestSpy).toHaveBeenCalledWith(gitServerSecretMock);

        expect(gitServerCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`shouldn't create git server if secret creation goes wrong`, async () => {
        let gitServerCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            gitServerCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const gitServerRequestSpy = jest
            .spyOn(EDPGitServerKubeObject.apiEndpoint, 'post')
            .mockReturnValue({
                gitServer: gitServerMock,
                secretCreated: true,
            });
        const secretRequestSpy = jest
            .spyOn(SecretKubeObject.default.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure', secretCreated: false });

        const {
            result: {
                current: { createGitServer },
            },
        } = renderHook(() => useCreateGitServer(onCreate, onError));

        const createGitServerPromise = createGitServer(gitServerMock, gitServerSecretMock);

        await expect(createGitServerPromise).rejects.toEqual({
            status: 'Failure',
            secretCreated: false,
        });

        await expect(secretRequestSpy).toHaveBeenCalledWith(gitServerSecretMock);
        await expect(gitServerRequestSpy).not.toHaveBeenCalled();
        expect(gitServerCreated).toBe(false);
        expect(hasError).toBe(true);
    });
    it(`should delete secret if git server creation goes wrong`, async () => {
        let gitServerCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            gitServerCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };
        const gitServerRequestSpy = jest
            .spyOn(EDPGitServerKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure', secretCreated: false });

        const secretRequestSpy = jest
            .spyOn(SecretKubeObject.default.apiEndpoint, 'post')
            .mockReturnValue(gitServerSecretMock);

        const secretRequestDeleteSpy = jest.spyOn(SecretKubeObject.default.apiEndpoint, 'delete');

        const {
            result: {
                current: { createGitServer },
            },
        } = renderHook(() => useCreateGitServer(onCreate, onError));

        const createGitServerPromise = createGitServer(gitServerMock, gitServerSecretMock);

        await expect(createGitServerPromise).rejects.toEqual({
            status: 'Failure',
            secretCreated: false,
        });

        await expect(secretRequestSpy).toHaveBeenCalledWith(gitServerSecretMock);
        await expect(gitServerRequestSpy).toHaveBeenCalledWith(gitServerMock);
        await expect(secretRequestDeleteSpy).toHaveBeenCalled();
        expect(gitServerCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
