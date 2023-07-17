import { BackwardNameMapping } from '../../types/forms';
import { FORM_PART_CODEBASE_INFO } from '../CreateCodebase/constants';

const LABEL_CODEBASE_NAME = 'app.edp.epam.com/codebaseName';

const NAMES = {
    NAME: 'name',
    NAMESPACE: 'namespace',
    CODEBASE_NAME: 'codebaseName',
    BRANCH_VERSION_START: 'branchVersionStart',
    BRANCH_VERSION_POSTFIX: 'branchVersionPostfix',
    DEFAULT_BRANCH_VERSION_START: 'defaultBranchVersionStart',
    DEFAULT_BRANCH_VERSION_POSTFIX: 'defaultBranchVersionPostfix',
    BRANCH_NAME: 'branchName',
    FROM_COMMIT: 'fromCommit',
    RELEASE: 'release',
    VERSION: 'version',
    CODEBASE_NAME_LABEL: 'codebaseNameLabel',
} as const;

export const CODEBASE_BRANCH_FORM_NAMES = {
    [NAMES.BRANCH_VERSION_START]: {
        name: NAMES.BRANCH_VERSION_START,
        notUsedInFormData: true,
    },
    [NAMES.BRANCH_VERSION_POSTFIX]: {
        name: NAMES.BRANCH_VERSION_POSTFIX,
        notUsedInFormData: true,
    },
    [NAMES.DEFAULT_BRANCH_VERSION_START]: {
        name: NAMES.DEFAULT_BRANCH_VERSION_START,
        notUsedInFormData: true,
    },
    [NAMES.DEFAULT_BRANCH_VERSION_POSTFIX]: {
        name: NAMES.DEFAULT_BRANCH_VERSION_POSTFIX,
        notUsedInFormData: true,
    },
    [NAMES.CODEBASE_NAME]: {
        name: NAMES.CODEBASE_NAME,
        path: ['spec', 'codebaseName'],
        notUsedInFormData: true,
    },
    [NAMES.NAMESPACE]: {
        name: NAMES.NAMESPACE,
        path: ['metadata', 'namespace'],
        notUsedInFormData: true,
    },
    [NAMES.NAME]: {
        name: NAMES.NAME,
        path: ['metadata', 'name'],
    },
    [NAMES.BRANCH_NAME]: {
        name: NAMES.BRANCH_NAME,
        path: ['spec', 'branchName'],
    },
    [NAMES.FROM_COMMIT]: {
        name: NAMES.FROM_COMMIT,
        path: ['spec', 'fromCommit'],
    },
    [NAMES.RELEASE]: {
        name: NAMES.RELEASE,
        path: ['spec', 'release'],
    },
    [NAMES.VERSION]: {
        name: NAMES.VERSION,
        path: ['spec', 'version'],
    },
    [NAMES.CODEBASE_NAME_LABEL]: {
        name: NAMES.CODEBASE_NAME_LABEL,
        formPart: FORM_PART_CODEBASE_INFO,
        path: ['metadata', 'labels', LABEL_CODEBASE_NAME],
    },
};

export const CODEBASE_BRANCH_BACKWARDS_FIELD_MAPPING: BackwardNameMapping = {
    labels: {
        children: {
            [LABEL_CODEBASE_NAME]: {
                formItemName: NAMES.CODEBASE_NAME_LABEL,
            },
        },
    },
};
