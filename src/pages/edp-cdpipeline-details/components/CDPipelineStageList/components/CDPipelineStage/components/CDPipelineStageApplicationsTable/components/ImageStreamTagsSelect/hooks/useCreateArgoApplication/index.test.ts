/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { ArgoApplicationKubeObject } from '../../../../../../../../../../../../k8s/ArgoApplication';
import { pluginLib } from '../../../../../../../../../../../../plugin.globals';
import { useCreateArgoApplication } from './index';
import { argoApplicationMock } from './mocks/argoApplication.mock';
import { gerritsMock } from './mocks/gerrits.mock';

const { ApiProxy } = pluginLib;

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

ArgoApplicationKubeObject.apiEndpoint.post = jest.fn().mockImplementation(() => {});

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Math, 'random').mockRestore();
});

describe('testing useCreateArgoApplication hook', () => {
    it('should successfully create ArgoApplication resource', async () => {
        let argoApplicationCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            argoApplicationCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('gerrits')) {
                return Promise.resolve(gerritsMock);
            }
        });

        const argoApplicationPostRequestSpy = jest
            .spyOn(ArgoApplicationKubeObject.apiEndpoint, 'post')
            .mockResolvedValue(argoApplicationMock);

        const {
            result: {
                current: { createArgoApplication },
            },
        } = renderHook(() => useCreateArgoApplication(onCreate, onError));

        const createArgoApplicationPromise = createArgoApplication({
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            appName: 'test-app-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            namespace: 'test-namespace',
        });

        await expect(createArgoApplicationPromise).resolves.toEqual(argoApplicationMock);
        expect(argoApplicationPostRequestSpy).toHaveBeenCalledWith(argoApplicationMock);

        expect(argoApplicationCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`shouldn't create ArgoApplication if something goes wrong`, async () => {
        let argoApplicationCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            argoApplicationCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        jest.spyOn(ApiProxy, 'request').mockImplementation(url => {
            if (url.includes('gerrits')) {
                return Promise.resolve(gerritsMock);
            }
        });

        const argoApplicationPostRequestSpy = jest
            .spyOn(ArgoApplicationKubeObject.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createArgoApplication },
            },
        } = renderHook(() => useCreateArgoApplication(onCreate, onError));

        const createArgoApplicationPromise = createArgoApplication({
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            appName: 'test-app-name',
            imageName: 'test-image-name',
            imageTag: 'test-image-tag',
            namespace: 'test-namespace',
        });

        await expect(createArgoApplicationPromise).rejects.toEqual({ status: 'Failure' });
        expect(argoApplicationPostRequestSpy).toHaveBeenCalledWith(argoApplicationMock);

        expect(argoApplicationCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
