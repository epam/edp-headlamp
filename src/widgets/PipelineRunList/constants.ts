import { PIPELINE_TYPES } from '../../constants/pipelineTypes';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../k8s/groups/Tekton/PipelineRun/labels';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { ControlName } from '../../providers/Filter/types';
import { ValueOf } from '../../types/global';
import { MatchFunctions } from './types';

export const pipelineRunFilterControlNames = {
  CODEBASES: 'codebases',
  STATUS: 'status',
  PIPELINE_TYPE: 'pipelineType',
} as const;

export type PipelineRunFilterControlNames = ValueOf<typeof pipelineRunFilterControlNames>;

export type PipelineRunFilterAllControlNames = ControlName<PipelineRunFilterControlNames>;

export const matchFunctions: MatchFunctions = {
  [pipelineRunFilterControlNames.CODEBASES]: (
    item: PipelineRunKubeObjectInterface,
    value: string[]
  ) => {
    if (!value || value.length === 0) return true;

    const pipelineType = item?.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE];

    if (pipelineType === PIPELINE_TYPES.DEPLOY || pipelineType === PIPELINE_TYPES.CLEAN) {
      const appPayload = item?.spec?.params?.find(
        (param: { name: string; value: string }) => param.name === 'APPLICATIONS_PAYLOAD'
      );

      if (!appPayload) {
        return false;
      }

      const appPayloadValue = JSON.parse(appPayload.value);

      return Object.keys(appPayloadValue).some((key) => value.includes(key));
    }

    const itemCodebase = item?.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_CODEBASE];

    return value.includes(itemCodebase);
  },
  [pipelineRunFilterControlNames.STATUS]: (item: PipelineRunKubeObjectInterface, value: string) => {
    if (value === 'All') {
      return true;
    }

    return item?.status?.conditions?.[0]?.status?.toLowerCase() === value;
  },
  [pipelineRunFilterControlNames.PIPELINE_TYPE]: (
    item: PipelineRunKubeObjectInterface,
    value: string
  ) => {
    if (value === PIPELINE_TYPES.ALL) {
      return true;
    }

    return item?.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] === value;
  },
};

export const widgetPermissionsToCheck = {
  create: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
  update: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
  delete: [{ instance: PipelineRunKubeObject, config: PipelineRunKubeObjectConfig }],
};
