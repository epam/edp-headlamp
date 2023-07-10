import { BackwardNameMapping } from '../../types/forms';
import { FORM_PART_CODEBASE_INFO } from '../CreateCodebase/constants';

const LABEL_CODEBASE_NAME = 'app.edp.epam.com/codebaseName';

const NAME_NAME = 'name' as const;
const NAME_NAMESPACE = 'namespace' as const;
const NAME_CODEBASE_NAME = 'codebaseName' as const;
const NAME_BRANCH_VERSION_START = 'branchVersionStart' as const;
const NAME_BRANCH_VERSION_POSTFIX = 'branchVersionPostfix' as const;
const NAME_DEFAULT_BRANCH_VERSION_START = 'defaultBranchVersionStart' as const;
const NAME_DEFAULT_BRANCH_VERSION_POSTFIX = 'defaultBranchVersionPostfix' as const;
const NAME_BRANCH_NAME = 'branchName' as const;
const NAME_FROM_COMMIT = 'fromCommit' as const;
const NAME_RELEASE = 'release' as const;
const NAME_VERSION = 'version' as const;
const NAME_CODEBASE_NAME_LABEL = 'codebaseNameLabel' as const;

export const CODEBASE_BRANCH_FORM_NAMES = {
    [NAME_BRANCH_VERSION_START]: {
        name: NAME_BRANCH_VERSION_START,
        notUsedInFormData: true,
    },
    [NAME_BRANCH_VERSION_POSTFIX]: {
        name: NAME_BRANCH_VERSION_POSTFIX,
        notUsedInFormData: true,
    },
    [NAME_DEFAULT_BRANCH_VERSION_START]: {
        name: NAME_DEFAULT_BRANCH_VERSION_START,
        notUsedInFormData: true,
    },
    [NAME_DEFAULT_BRANCH_VERSION_POSTFIX]: {
        name: NAME_DEFAULT_BRANCH_VERSION_POSTFIX,
        notUsedInFormData: true,
    },
    [NAME_CODEBASE_NAME]: {
        name: NAME_CODEBASE_NAME,
        path: ['spec', 'codebaseName'],
        notUsedInFormData: true,
    },
    [NAME_NAMESPACE]: {
        name: NAME_NAMESPACE,
        path: ['metadata', 'namespace'],
        notUsedInFormData: true,
    },
    [NAME_NAME]: {
        name: NAME_NAME,
        path: ['metadata', 'name'],
    },
    [NAME_BRANCH_NAME]: {
        name: NAME_BRANCH_NAME,
        path: ['spec', 'branchName'],
    },
    [NAME_FROM_COMMIT]: {
        name: NAME_FROM_COMMIT,
        path: ['spec', 'fromCommit'],
    },
    [NAME_RELEASE]: {
        name: NAME_RELEASE,
        path: ['spec', 'release'],
    },
    [NAME_VERSION]: {
        name: NAME_VERSION,
        path: ['spec', 'version'],
    },
    [NAME_CODEBASE_NAME_LABEL]: {
        name: NAME_CODEBASE_NAME_LABEL,
        formPart: FORM_PART_CODEBASE_INFO,
        path: ['metadata', 'labels', LABEL_CODEBASE_NAME],
    },
};

export const CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING: BackwardNameMapping = {
    labels: {
        children: {
            [LABEL_CODEBASE_NAME]: {
                formItemName: NAME_CODEBASE_NAME_LABEL,
            },
        },
    },
};
