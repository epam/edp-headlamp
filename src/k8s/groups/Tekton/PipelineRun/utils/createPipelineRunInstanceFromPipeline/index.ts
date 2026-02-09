import { createRandomString } from '../../../../../../utils/createRandomString';
import { truncateName } from '../../../../../../utils/truncateName';
import { PipelineKubeObjectInterface } from '../../../Pipeline/types';
import { TriggerTemplateKubeObjectInterface } from '../../../TriggerTemplate/types';
import { PipelineRunKubeObjectInterface } from '../../types';

const getPipelineRunFromTriggerTemplate = (
  triggerTemplate: TriggerTemplateKubeObjectInterface,
  pipeline: PipelineKubeObjectInterface
) => {
  if (!triggerTemplate) {
    return null;
  }

  const pipelineRun = triggerTemplate.spec.resourcetemplates?.[0];

  if (pipelineRun && pipelineRun.spec && pipelineRun.spec.pipelineRef) {
    pipelineRun.spec.pipelineRef.name = pipeline.metadata.name;
  }

  return pipelineRun;
};

export const createPipelineRunInstanceFromPipeline = (
  triggerTemplate: TriggerTemplateKubeObjectInterface | undefined,
  pipeline: PipelineKubeObjectInterface
): PipelineRunKubeObjectInterface => {
  if (triggerTemplate) {
    return getPipelineRunFromTriggerTemplate(triggerTemplate, pipeline);
  }

  const pipelineName = pipeline.metadata.name;
  const pipelineRunNamePrefix = 'run-';
  const pipelineRunNamePostfix = `-${createRandomString()}`;

  const truncatedName = truncateName(
    pipelineName,
    pipelineRunNamePrefix.length + pipelineRunNamePostfix.length
  );

  const pipelineRunName = `${pipelineRunNamePrefix}${truncatedName}${pipelineRunNamePostfix}`;

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
      params: (pipeline.spec.params || []).map((param: { name: string; default: string }) => {
        return {
          name: param.name,
          value: param.default || '',
        };
      }),
    },
  };

  return pipelineRun;
};
