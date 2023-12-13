/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { createDeployPipelineRunInstance } from './index';

beforeEach(() => {
    jest.spyOn(global.window.crypto, 'getRandomValues').mockReturnValue(
        new Uint32Array([2736861854, 4288701136, 612580786, 3178865852, 3429947584])
    );
});

afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.window.crypto, 'getRandomValues').mockRestore();
});

describe('testing createDeployPipelineRunInstance', () => {
    it('should return valid kube object', () => {
        const object = createDeployPipelineRunInstance({
            namespace: 'test-namespace',
            pipelineName: 'test-pipeline-name',
            stageName: 'test-stage-name',
            CDPipelineName: 'test-cdpipeline-name',
            codebaseTag: 'test-app-name=SNAPSHOT 0.0.0 test-app-2-name=SNAPSHOT 0.1.0',
        });

        expect(object).toEqual({
            apiVersion: 'tekton.dev/v1',
            kind: 'PipelineRun',
            metadata: {
                namespace: 'test-namespace',
                name: 'test-cdpipeline-name-test-stage-name-8ygse',
                labels: {
                    'app.edp.epam.com/pipeline': 'test-cdpipeline-name-test-stage-name',
                    'app.edp.epam.com/pipelinetype': 'deploy',
                },
            },
            spec: {
                taskRunTemplate: {
                    serviceAccountName: 'tekton',
                },
                params: [
                    {
                        name: 'CODEBASE_TAG',
                        value: 'test-app-name=SNAPSHOT 0.0.0 test-app-2-name=SNAPSHOT 0.1.0',
                    },
                    { name: 'CDPIPELINE_CR', value: 'test-cdpipeline-name' },
                    { name: 'CDPIPELINE_STAGE', value: 'test-stage-name' },
                ],
                pipelineRef: { name: 'test-pipeline-name' },
            },
        });
    });
});
