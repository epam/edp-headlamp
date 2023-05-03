import { BackwardNameMapping, FormNameObject } from '../../../../types/forms';

export const CDPIPELINE_STAGE_BACKWARDS_NAME_MAPPING: BackwardNameMapping = {
    source: {
        children: {
            library: {
                children: {
                    branch: {
                        formItemName: 'sourceLibraryBranch',
                    },
                    name: {
                        formItemName: 'sourceLibraryName',
                    },
                },
            },
            type: {
                formItemName: 'sourceType',
            },
        },
    },
};

export const CDPIPELINE_STAGE_NAME_QUALITY_GATES_TYPE_ADD_CHOOSER: FormNameObject = {
    name: 'qualityGatesTypeAddChooser',
    notUsedInFormData: true,
};

export const CDPIPELINE_STAGE_NAME_CLUSTER: FormNameObject = {
    name: 'cluster',
    notUsedInFormData: true,
};

export const CDPIPELINE_STAGE_NAME_NAME: FormNameObject = {
    name: 'name',
    path: ['metadata', 'name'],
    // path is not needed as name used in two places at the same time, check createCDPipelineInstance for reference
};

export const CDPIPELINE_STAGE_NAME_CDPIPELINE: FormNameObject = {
    name: 'cdPipeline',
    path: ['spec', 'cdPipeline'],
};

export const CDPIPELINE_STAGE_NAME_DESCRIPTION: FormNameObject = {
    name: 'description',
    path: ['spec', 'description'],
};

export const CDPIPELINE_STAGE_NAME_QUALITY_GATES: FormNameObject = {
    name: 'qualityGates',
    path: ['spec', 'qualityGates'],
};

export const CDPIPELINE_STAGE_NAME_SOURCE_LIBRARY_BRANCH: FormNameObject = {
    name: 'sourceLibraryBranch',
    path: ['spec', 'source', 'library', 'branch'],
};

export const CDPIPELINE_STAGE_NAME_SOURCE_LIBRARY_NAME: FormNameObject = {
    name: 'sourceLibraryName',
    path: ['spec', 'source', 'library', 'name'],
};

export const CDPIPELINE_STAGE_NAME_SOURCE_TYPE: FormNameObject = {
    name: 'sourceType',
    path: ['spec', 'source', 'type'],
};

export const CDPIPELINE_STAGE_NAME_TRIGGER_TYPE: FormNameObject = {
    name: 'triggerType',
    path: ['spec', 'triggerType'],
};

export const CDPIPELINE_STAGE_NAME_JOB_PROVISIONING: FormNameObject = {
    name: 'jobProvisioning',
    path: ['spec', 'jobProvisioning'],
};

export const CDPIPELINE_STAGE_NAME_ORDER: FormNameObject = {
    name: 'order',
    path: ['spec', 'order'],
};

export const CDPIPELINE_STAGE_NAME_NAMESPACE: FormNameObject = {
    name: 'namespace',
    path: ['metadata', 'namespace'],
};

export const CDPIPELINE_STAGE_NAMES: { [key: string]: FormNameObject } = {
    // NOT USED IN FORM DATA
    qualityGatesTypeAddChooser: CDPIPELINE_STAGE_NAME_QUALITY_GATES_TYPE_ADD_CHOOSER,
    cluster: CDPIPELINE_STAGE_NAME_CLUSTER,

    name: CDPIPELINE_STAGE_NAME_NAME,
    namespace: CDPIPELINE_STAGE_NAME_NAMESPACE,
    description: CDPIPELINE_STAGE_NAME_DESCRIPTION,
    qualityGates: CDPIPELINE_STAGE_NAME_QUALITY_GATES,
    sourceLibraryBranch: CDPIPELINE_STAGE_NAME_SOURCE_LIBRARY_BRANCH,
    sourceLibraryName: CDPIPELINE_STAGE_NAME_SOURCE_LIBRARY_NAME,
    sourceType: CDPIPELINE_STAGE_NAME_SOURCE_TYPE,
    triggerType: CDPIPELINE_STAGE_NAME_TRIGGER_TYPE,
    jobProvisioning: CDPIPELINE_STAGE_NAME_JOB_PROVISIONING,
    cdPipeline: CDPIPELINE_STAGE_NAME_CDPIPELINE,
    order: CDPIPELINE_STAGE_NAME_ORDER,
};
