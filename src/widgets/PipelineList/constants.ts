import { PIPELINE_TYPE } from '../../constants/pipelineTypes';
import { PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE } from '../../k8s/groups/Tekton/PipelineRun/labels';
import { MatchFunctions } from './types';

export const columnNames = {
  NAME: 'Name',
  DESCRIPTION: 'Description',
  CREATED_AT: 'Created At',
  DIAGRAM: 'Diagram',
  ACTIONS: 'Actions',
} as const;

export const pipelineFilterControlNames = {
  SEARCH: 'search',
  PIPELINE_TYPE: 'pipelineType',
} as const;

export const matchFunctions: MatchFunctions = {
  [pipelineFilterControlNames.PIPELINE_TYPE]: (item, value) => {
    if (value === PIPELINE_TYPE.ALL) {
      return true;
    }

    return item?.metadata.labels?.[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] === value;
  },
};
