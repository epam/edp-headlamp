import { FormNameObject } from '../../../../types/forms';

export const CDPIPELINE_EDIT_NAME_NAMESPACE: FormNameObject = {
    name: 'namespace',
    path: ['metadata', 'namespace'],
};

export const CDPIPELINE_EDIT_NAME_APPLICATIONS: FormNameObject = {
    name: 'applications',
    path: ['spec', 'applications'],
};

export const CDPIPELINE_EDIT_NAME_APPLICATIONS_TO_PROMOTE: FormNameObject = {
    name: 'applicationsToPromote',
    path: ['spec', 'applicationsToPromote'],
};

export const CDPIPELINE_EDIT_NAME_INPUT_DOCKER_STREAMS: FormNameObject = {
    name: 'inputDockerStreams',
    path: ['spec', 'inputDockerStreams'],
};

export const CDPIPELINE_EDIT_NAME_APPLICATIONS_TO_ADD_CHOOSER: FormNameObject = {
    name: 'applicationsToAddChooser',
    notUsedInFormData: true,
};

export const CDPIPELINE_EDIT_FORM_NAMES: { [key: string]: FormNameObject } = {
    applications: CDPIPELINE_EDIT_NAME_APPLICATIONS,
    applicationsToPromote: CDPIPELINE_EDIT_NAME_APPLICATIONS_TO_PROMOTE,
    inputDockerStreams: CDPIPELINE_EDIT_NAME_INPUT_DOCKER_STREAMS,
    namespace: CDPIPELINE_EDIT_NAME_NAMESPACE,
    applicationsToAddChooser: CDPIPELINE_EDIT_NAME_APPLICATIONS_TO_ADD_CHOOSER,
};
