/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { PipelineRun } from '../../../../../../../../../../k8s/PipelineRun';
import { createRandomFiveSymbolString } from '../../../../../../../../../../utils/createRandomFiveSymbolString';
import { useCreateDeployPipelineRun } from './index';
import { pipelineRunMock } from './mocks/pipelineRun.mock';

jest.mock('notistack', () => ({
    useSnackbar: () => ({
        enqueueSnackbar: () => {},
    }),
    withSnackbar: () => ({}),
}));

PipelineRun.apiEndpoint.post = jest.fn().mockImplementation(() => {});

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing useCreateDeployPipelineRun hook', () => {
    it('should successfully create PipelineRun resource', async () => {
        let pipelineRunCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            pipelineRunCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        const pipelineRunRequestSpy = jest
            .spyOn(PipelineRun.apiEndpoint, 'post')
            .mockResolvedValue(pipelineRunMock);

        const {
            result: {
                current: { createDeployPipelineRun },
            },
        } = renderHook(() => useCreateDeployPipelineRun(onCreate, onError));

        const randomPostfix = createRandomFiveSymbolString();

        const createPipelineRunPromise = createDeployPipelineRun({
            namespace: 'test-namespace',
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            CDPipelineName: 'test-cdpipeline-name',
            codebaseTag: 'test-app-name=SNAPSHOT 0.0.0 test-app-2-name=SNAPSHOT 0.1.0',
            randomPostfix,
        });

        await expect(createPipelineRunPromise).resolves.toEqual(pipelineRunMock);
        expect(pipelineRunRequestSpy).toHaveBeenCalledWith(pipelineRunMock);

        expect(pipelineRunCreated).toBe(true);
        expect(hasError).toBe(false);
    });
    it(`shouldn't create Application if something goes wrong`, async () => {
        let pipelineRunCreated: boolean = false;
        let hasError: boolean = false;

        const onCreate = (): void => {
            pipelineRunCreated = true;
        };
        const onError = (): void => {
            hasError = true;
        };

        const pipelineRunRequestSpy = jest
            .spyOn(PipelineRun.apiEndpoint, 'post')
            .mockRejectedValue({ status: 'Failure' });

        const {
            result: {
                current: { createDeployPipelineRun },
            },
        } = renderHook(() => useCreateDeployPipelineRun(onCreate, onError));

        const randomPostfix = createRandomFiveSymbolString();
        const createPipelineRunPromise = createDeployPipelineRun({
            namespace: 'test-namespace',
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            CDPipelineName: 'test-cdpipeline-name',
            codebaseTag: 'test-app-name=SNAPSHOT 0.0.0 test-app-2-name=SNAPSHOT 0.1.0',
            randomPostfix,
        });

        await expect(createPipelineRunPromise).rejects.toEqual({ status: 'Failure' });
        expect(pipelineRunRequestSpy).toHaveBeenCalledWith(pipelineRunMock);

        expect(pipelineRunCreated).toBe(false);
        expect(hasError).toBe(true);
    });
});
