import { createRandomString } from '../../../../utils/createRandomString';
import { PipelineRunKubeObjectConfig } from '../../config';
import { PipelineRunKubeObjectInterface } from '../../types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

export const createAutotestRunnerPipelineRunInstance = ({
  namespace,
  stageSpecName,
  CDPipelineName,
  storageSize,
}: {
  namespace: string;
  stageSpecName: string;
  CDPipelineName: string;
  storageSize: string;
}): PipelineRunKubeObjectInterface => {
  return {
    apiVersion: `${group}/${version}`,
    kind,
    // @ts-ignore
    metadata: {
      // @ts-ignore
      generateName: `${CDPipelineName}-${stageSpecName}-${createRandomString()}`,
      namespace,
      labels: {
        'app.edp.epam.com/pipelinetype': 'autotestRunner',
        'app.edp.epam.com/stage': stageSpecName,
        'app.edp.epam.com/pipeline': CDPipelineName,
      },
    },
    spec: {
      pipelineRef: {
        name: 'autotest-runner',
      },
      params: [
        {
          name: 'cd-pipeline-name',
          value: CDPipelineName,
        },
        {
          name: 'stage-name',
          value: stageSpecName,
        },
      ],
      taskRunTemplate: {
        serviceAccountName: 'tekton',
      },
      workspaces: [
        {
          name: 'shared-workspace',
          volumeClaimTemplate: {
            spec: {
              accessModes: ['ReadWriteOnce'],
              resources: {
                requests: {
                  storage: storageSize,
                },
              },
              volumeMode: 'Filesystem',
            },
          },
        },
      ],
    },
  };
};
