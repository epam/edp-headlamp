import { FormNameObject } from '../../../../types/forms';
import { FORM_PART_APPLICATIONS, FORM_PART_PIPELINE } from './constants';

export const CDPIPELINE_BACKWARDS_NAME_MAPPING = {};

export const CDPIPELINE_CREATION_NAME_NAME: FormNameObject = {
    name: 'name',
    formPart: FORM_PART_PIPELINE,
    // path is not needed as name used in two places at the same time, check createCDPipelineInstance for reference
};

export const CDPIPELINE_CREATION_NAME_NAMESPACE: FormNameObject = {
    name: 'namespace',
    formPart: FORM_PART_PIPELINE,
    path: ['metadata', 'namespace'],
};

export const CDPIPELINE_CREATION_NAME_DEPLOYMENT_TYPE: FormNameObject = {
    name: 'deploymentType',
    formPart: FORM_PART_PIPELINE,
    path: ['spec', 'deploymentType'],
};

export const CDPIPELINE_CREATION_NAME_APPLICATIONS_TO_ADD_CHOOSER: FormNameObject = {
    name: 'applicationsToAddChooser',
    formPart: FORM_PART_PIPELINE,
    notUsedInFormData: true,
};

export const CDPIPELINE_CREATION_NAME_APPLICATIONS: FormNameObject = {
    name: 'applications',
    formPart: FORM_PART_APPLICATIONS,
    path: ['spec', 'applications'],
};

export const CDPIPELINE_CREATION_NAME_APPLICATIONS_TO_PROMOTE: FormNameObject = {
    name: 'applicationsToPromote',
    formPart: FORM_PART_APPLICATIONS,
    path: ['spec', 'applicationsToPromote'],
};

export const CDPIPELINE_CREATION_NAME_INPUT_DOCKER_STREAMS: FormNameObject = {
    name: 'inputDockerStreams',
    formPart: FORM_PART_APPLICATIONS,
    path: ['spec', 'inputDockerStreams'],
};

export const CDPIPELINE_CREATION_FORM_NAMES: { [key: string]: FormNameObject } = {
    // NOT USED IN FORM DATA
    applicationsToAddChooser: CDPIPELINE_CREATION_NAME_APPLICATIONS_TO_ADD_CHOOSER,

    // FORM PART PIPELINE
    namespace: CDPIPELINE_CREATION_NAME_NAMESPACE,
    name: CDPIPELINE_CREATION_NAME_NAME,
    deploymentType: CDPIPELINE_CREATION_NAME_DEPLOYMENT_TYPE,

    // FORM PART APPLICATIONS
    applications: CDPIPELINE_CREATION_NAME_APPLICATIONS,
    applicationsToPromote: CDPIPELINE_CREATION_NAME_APPLICATIONS_TO_PROMOTE,
    inputDockerStreams: CDPIPELINE_CREATION_NAME_INPUT_DOCKER_STREAMS,
};
