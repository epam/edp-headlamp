import { BackwardNameMapping } from '../../../types/forms';
import { FORM_STEPS } from './constants';

const NAMES = {
  NAME: 'name',
  NAMESPACE: 'namespace',
  DEPLOY_NAMESPACE: 'deployNamespace',
  DESCRIPTION: 'description',
  QUALITY_GATES: 'qualityGates',
  SOURCE_LIBRARY_BRANCH: 'sourceLibraryBranch',
  SOURCE_LIBRARY_NAME: 'sourceLibraryName',
  SOURCE_TYPE: 'sourceType',
  TRIGGER_TYPE: 'triggerType',
  ORDER: 'order',
  CDPIPELINE: 'cdPipeline',
  CLUSTER_NAME: 'cluster',
  TRIGGER_TEMPLATE: 'triggerTemplate',
  CLEAN_TEMPLATE: 'cleanTemplate',

  // NOT USED IN RESOURCE DATA
  QUALITY_GATES_TYPE_ADD_CHOOSER: 'qualityGatesTypeAddChooser',
} as const;

export const STAGE_FORM_NAMES = {
  [NAMES.NAME]: {
    name: NAMES.NAME,
    path: ['metadata', 'name'],
    formPart: FORM_STEPS.CONFIGURATION,
  },
  [NAMES.NAMESPACE]: {
    name: NAMES.NAMESPACE,
    path: ['metadata', 'namespace'],
  },
  [NAMES.DEPLOY_NAMESPACE]: {
    name: NAMES.DEPLOY_NAMESPACE,
    path: ['spec', 'namespace'],
    formPart: FORM_STEPS.CONFIGURATION,
  },
  [NAMES.DESCRIPTION]: {
    name: NAMES.DESCRIPTION,
    path: ['spec', 'description'],
    formPart: FORM_STEPS.CONFIGURATION,
  },
  [NAMES.QUALITY_GATES]: {
    name: NAMES.QUALITY_GATES,
    path: ['spec', 'qualityGates'],
  },
  [NAMES.SOURCE_LIBRARY_BRANCH]: {
    name: NAMES.SOURCE_LIBRARY_BRANCH,
    path: ['spec', 'source', 'library', 'branch'],
  },
  [NAMES.SOURCE_LIBRARY_NAME]: {
    name: NAMES.SOURCE_LIBRARY_NAME,
    path: ['spec', 'source', 'library', 'name'],
  },
  [NAMES.SOURCE_TYPE]: {
    name: NAMES.SOURCE_TYPE,
    path: ['spec', 'source', 'type'],
  },
  [NAMES.TRIGGER_TYPE]: {
    name: NAMES.TRIGGER_TYPE,
    path: ['spec', 'triggerType'],
    formPart: FORM_STEPS.CONFIGURATION,
  },
  [NAMES.ORDER]: {
    name: NAMES.ORDER,
    path: ['spec', 'order'],
  },
  [NAMES.CDPIPELINE]: {
    name: NAMES.CDPIPELINE,
    path: ['spec', 'cdPipeline'],
  },
  [NAMES.CLUSTER_NAME]: {
    name: NAMES.CLUSTER_NAME,
    path: ['spec', 'clusterName'],
    formPart: FORM_STEPS.CONFIGURATION,
  },
  [NAMES.TRIGGER_TEMPLATE]: {
    name: NAMES.TRIGGER_TEMPLATE,
    path: ['spec', 'triggerTemplate'],
    formPart: FORM_STEPS.CONFIGURATION,
  },
  [NAMES.CLEAN_TEMPLATE]: {
    name: NAMES.CLEAN_TEMPLATE,
    path: ['spec', 'cleanTemplate'],
    formPart: FORM_STEPS.CONFIGURATION,
  },

  // NOT USED IN RESOURCE DATA
  [NAMES.QUALITY_GATES_TYPE_ADD_CHOOSER]: {
    name: NAMES.QUALITY_GATES_TYPE_ADD_CHOOSER,
    notUsedInFormData: true,
  },
};

export const STAGE_FORM_BACKWARD_NAME_MAPPING: BackwardNameMapping = {
  source: {
    children: {
      library: {
        children: {
          branch: {
            formItemName: NAMES.SOURCE_LIBRARY_BRANCH,
          },
          name: {
            formItemName: NAMES.SOURCE_LIBRARY_NAME,
          },
        },
      },
      type: {
        formItemName: NAMES.SOURCE_TYPE,
      },
    },
  },
};
