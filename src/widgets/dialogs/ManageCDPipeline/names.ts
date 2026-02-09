import { FORM_STEPS } from './constants';

export const NAMES = {
  NAME: 'name',
  NAMESPACE: 'namespace',
  DESCRIPTION: 'description',
  DEPLOYMENT_TYPE: 'deploymentType',
  APPLICATIONS: 'applications',
  APPLICATIONS_TO_PROMOTE: 'applicationsToPromote',
  INPUT_DOCKER_STREAMS: 'inputDockerStreams',

  // NOT USED IN RESOURCE DATA
  APPLICATIONS_TO_ADD_CHOOSER: 'applicationsToAddChooser',
  APPLICATIONS_FIELD_ARRAY: 'applicationsFieldArray',
  APPLICATIONS_TO_PROMOTE_ALL: 'applicationsToPromoteAll',
} as const;

export const CDPIPELINE_FORM_NAMES = {
  [NAMES.NAME]: {
    name: NAMES.NAME,
    formPart: FORM_STEPS.PIPELINE,
    path: ['metadata', 'name'],
  },
  [NAMES.NAMESPACE]: {
    name: NAMES.NAMESPACE,
    formPart: FORM_STEPS.PIPELINE,
    path: ['metadata', 'namespace'],
  },
  [NAMES.DESCRIPTION]: {
    name: NAMES.DESCRIPTION,
    formPart: FORM_STEPS.PIPELINE,
    path: ['spec', 'description'],
  },
  [NAMES.DEPLOYMENT_TYPE]: {
    name: NAMES.DEPLOYMENT_TYPE,
    formPart: FORM_STEPS.PIPELINE,
    path: ['spec', 'deploymentType'],
  },
  [NAMES.APPLICATIONS]: {
    name: NAMES.APPLICATIONS,
    formPart: FORM_STEPS.APPLICATIONS,
    path: ['spec', 'applications'],
  },
  [NAMES.APPLICATIONS_TO_PROMOTE]: {
    name: NAMES.APPLICATIONS_TO_PROMOTE,
    formPart: FORM_STEPS.APPLICATIONS,
    path: ['spec', 'applicationsToPromote'],
  },
  [NAMES.INPUT_DOCKER_STREAMS]: {
    name: NAMES.INPUT_DOCKER_STREAMS,
    formPart: FORM_STEPS.APPLICATIONS,
    path: ['spec', 'inputDockerStreams'],
  },

  // NOT USED IN RESOURCE DATA
  [NAMES.APPLICATIONS_TO_ADD_CHOOSER]: {
    name: NAMES.APPLICATIONS_TO_ADD_CHOOSER,
    formPart: FORM_STEPS.APPLICATIONS,
    notUsedInFormData: true,
  },
  [NAMES.APPLICATIONS_FIELD_ARRAY]: {
    name: NAMES.APPLICATIONS_FIELD_ARRAY,
    formPart: FORM_STEPS.APPLICATIONS,
    notUsedInFormData: true,
  },
  [NAMES.APPLICATIONS_TO_PROMOTE_ALL]: {
    name: NAMES.APPLICATIONS_TO_PROMOTE_ALL,
    formPart: FORM_STEPS.APPLICATIONS,
    notUsedInFormData: true,
  },
};
