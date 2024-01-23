import { FORM_PART_APPLICATIONS, FORM_PART_PIPELINE } from './constants';

const NAMES = {
  NAME: 'name',
  NAMESPACE: 'namespace',
  DEPLOYMENT_TYPE: 'deploymentType',
  APPLICATIONS: 'applications',
  APPLICATIONS_TO_PROMOTE: 'applicationsToPromote',
  INPUT_DOCKER_STREAMS: 'inputDockerStreams',

  // NOT USED IN RESOURCE DATA
  APPLICATIONS_TO_ADD_CHOOSER: 'applicationsToAddChooser',
} as const;

export const CDPIPELINE_FORM_NAMES = {
  [NAMES.NAME]: {
    name: NAMES.NAME,
    formPart: FORM_PART_PIPELINE,
    path: ['metadata', 'name'],
  },
  [NAMES.NAMESPACE]: {
    name: NAMES.NAMESPACE,
    formPart: FORM_PART_PIPELINE,
    path: ['metadata', 'namespace'],
  },
  [NAMES.DEPLOYMENT_TYPE]: {
    name: NAMES.DEPLOYMENT_TYPE,
    formPart: FORM_PART_PIPELINE,
    path: ['spec', 'deploymentType'],
  },
  [NAMES.APPLICATIONS]: {
    name: NAMES.APPLICATIONS,
    formPart: FORM_PART_APPLICATIONS,
    path: ['spec', 'applications'],
  },
  [NAMES.APPLICATIONS_TO_PROMOTE]: {
    name: NAMES.APPLICATIONS_TO_PROMOTE,
    formPart: FORM_PART_APPLICATIONS,
    path: ['spec', 'applicationsToPromote'],
  },
  [NAMES.INPUT_DOCKER_STREAMS]: {
    name: NAMES.INPUT_DOCKER_STREAMS,
    formPart: FORM_PART_APPLICATIONS,
    path: ['spec', 'inputDockerStreams'],
  },

  // NOT USED IN RESOURCE DATA
  [NAMES.APPLICATIONS_TO_ADD_CHOOSER]: {
    name: NAMES.APPLICATIONS_TO_ADD_CHOOSER,
    formPart: FORM_PART_APPLICATIONS,
    notUsedInFormData: true,
  },
};
