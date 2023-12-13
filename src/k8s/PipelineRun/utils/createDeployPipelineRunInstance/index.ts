import { createRandomString } from '../../../../utils/createRandomString';
import { PipelineRunKubeObjectConfig } from '../../config';
import { PipelineRunKubeObjectInterface } from '../../types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

export const createDeployPipelineRunInstance = ({
    namespace,
    pipelineName,
    stageName,
    CDPipelineName,
    codebaseTag,
}: {
    namespace: string;
    pipelineName: string;
    stageName: string;
    CDPipelineName: string;
    codebaseTag: string;
}): PipelineRunKubeObjectInterface => {
    return {
        apiVersion: `${group}/${version}`,
        kind,
        // @ts-ignore
        metadata: {
            namespace,
            name: `${CDPipelineName}-${stageName}-${createRandomString()}`,
            labels: {
                'app.edp.epam.com/pipeline': `${CDPipelineName}-${stageName}`,
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
                    value: codebaseTag,
                },
                {
                    name: 'CDPIPELINE_CR',
                    value: CDPipelineName,
                },
                {
                    name: 'CDPIPELINE_STAGE',
                    value: stageName,
                },
            ],
            pipelineRef: {
                name: pipelineName,
            },
        },
    };
};
