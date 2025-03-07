import { KubeObjectClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { PIPELINE_TYPE } from '../../constants/pipelineTypes';
import { PipelineRunKubeObject } from '../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../k8s/groups/Tekton/PipelineRun/config';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../k8s/groups/Tekton/PipelineRun/labels';
import { MatchFunctions } from './types';

export const pipelineRunFilterControlNames = {
  CODEBASES: 'codebases',
  STATUS: 'status',
  PIPELINE_TYPE: 'pipelineType',
} as const;

export const columnNames = {
  STATUS: 'status',
  RUN: 'run',
  PIPELINE: 'pipeline',
  RESULTS: 'results',
  PULL_REQUEST: 'pullRequestUrl',
  STARTED_AT: 'startedAt',
  TIME: 'time',
  DIAGRAM: 'diagram',
  ACTIONS: 'actions',
} as const;

export const matchFunctions: MatchFunctions = {
  [pipelineRunFilterControlNames.CODEBASES]: (item, value) => {
    if (!value || value.length === 0) return true;

    const pipelineType = item?.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE];

    if (pipelineType === PIPELINE_TYPE.DEPLOY || pipelineType === PIPELINE_TYPE.CLEAN) {
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

    if (!itemCodebase) {
      return false;
    }

    return value.includes(itemCodebase);
  },
  [pipelineRunFilterControlNames.STATUS]: (item, value) => {
    if (value === 'All') {
      return true;
    }

    return item?.status?.conditions?.[0]?.status?.toLowerCase() === value;
  },
  [pipelineRunFilterControlNames.PIPELINE_TYPE]: (item, value) => {
    if (value === PIPELINE_TYPE.ALL) {
      return true;
    }

    return item?.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] === value;
  },
};

export const widgetPermissionsToCheck = {
  create: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
  update: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
  delete: [
    {
      instance: PipelineRunKubeObject as unknown as KubeObjectClass,
      config: PipelineRunKubeObjectConfig,
    },
  ],
};
