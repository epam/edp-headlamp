import { PipelineRunKubeObjectInterface } from '../../../../../../../../../../../k8s/PipelineRun/types';

export const pipelineRunMock: PipelineRunKubeObjectInterface = {
    apiVersion: 'tekton.dev/v1beta1',
    kind: 'PipelineRun',
    metadata: {
        namespace: 'test-namespace',
        name: 'test-cdpipeline-name-test-stage-name-8ygse',
        labels: {
            'app.edp.epam.com/pipelinename': 'test-cdpipeline-name-test-stage-name',
            'app.edp.epam.com/pipelinetype': 'deploy',
        },
    },
    spec: {
        serviceAccountName: 'tekton',
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
};
