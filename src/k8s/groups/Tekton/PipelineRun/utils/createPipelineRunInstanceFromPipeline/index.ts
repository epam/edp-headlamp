import { createRandomString } from '../../../../../../utils/createRandomString';
import { truncateName } from '../../../../../../utils/truncateName';
import { PipelineKubeObjectInterface } from '../../../Pipeline/types';
import { PipelineRunKubeObjectInterface } from '../../types';

export const createPipelineRunInstanceFromPipeline = (
  pipeline: PipelineKubeObjectInterface
): PipelineRunKubeObjectInterface => {
  const pipelineName = pipeline.metadata.name;
  const pipelineRunNamePrefix = 'run-';
  const pipelineRunNamePostfix = `-${createRandomString()}`;

  const truncatedName = truncateName(
    pipelineName,
    pipelineRunNamePrefix.length + pipelineRunNamePostfix.length
  );

  const pipelineRunName = `${pipelineRunNamePrefix}${truncatedName}${pipelineRunNamePostfix}`;

  const pipelineRunParams = pipeline.spec.params.map((param) => {
    return {
      name: param.name,
      value: param.default || '',
    };
  });

  const pipelineRun: PipelineRunKubeObjectInterface = {
    apiVersion: 'tekton.dev/v1',
    kind: 'PipelineRun',
    // @ts-ignore
    metadata: {
      name: pipelineRunName,
      namespace: pipeline.metadata.namespace,
    },
    spec: {
      pipelineRef: {
        name: pipeline.metadata.name,
      },
      params: pipelineRunParams,
    },
  };

  return pipelineRun;
};
