import { BackwardNameMapping, FormNameObject } from '../../../../types/forms';
import { FORM_PART_CODEBASE_INFO } from '../../../CreateCodebase/components/CreateCodebaseForm/constants';

export const CODEBASE_BRANCH_BACKWARDS_NAME_MAPPING: BackwardNameMapping = {
    labels: {
        children: {
            'app.edp.epam.com/codebaseName': {
                formItemName: 'codebaseNameLabel',
            },
        },
    },
};

export const CODEBASE_BRANCH_CREATION_NAME_NAMESPACE: FormNameObject = {
    name: 'namespace',
    path: ['metadata', 'namespace'],
    notUsedInFormData: true,
};

export const CODEBASE_BRANCH_CREATION_NAME_NAME: FormNameObject = {
    name: 'name',
    path: ['metadata', 'name'],
};

export const CODEBASE_BRANCH_CREATION_NAME_BRANCH_NAME: FormNameObject = {
    name: 'branchName',
    path: ['spec', 'branchName'],
};

export const CODEBASE_BRANCH_CREATION_NAME_FROM_COMMIT: FormNameObject = {
    name: 'fromCommit',
    path: ['spec', 'fromCommit'],
};

export const CODEBASE_BRANCH_CREATION_NAME_RELEASE: FormNameObject = {
    name: 'release',
    path: ['spec', 'release'],
    notUsedInFormData: true,
};

export const CODEBASE_BRANCH_CREATION_NAME_CODEBASE_NAME: FormNameObject = {
    name: 'codebaseName',
    path: ['spec', 'codebaseName'],
    notUsedInFormData: true,
};

export const CODEBASE_CREATION_NAME_CODEBASE_NAME_LABEL: FormNameObject = {
    name: 'codebaseNameLabel',
    formPart: FORM_PART_CODEBASE_INFO,
    path: ['metadata', 'labels', 'app.edp.epam.com/codebaseName'],
};

export const CODEBASE_BRANCH_NAMES: { [key: string]: FormNameObject } = {
    branchName: CODEBASE_BRANCH_CREATION_NAME_BRANCH_NAME,
    fromCommit: CODEBASE_BRANCH_CREATION_NAME_FROM_COMMIT,
    name: CODEBASE_BRANCH_CREATION_NAME_NAME,
    namespace: CODEBASE_BRANCH_CREATION_NAME_NAMESPACE,
    release: CODEBASE_BRANCH_CREATION_NAME_RELEASE,
    codebaseName: CODEBASE_BRANCH_CREATION_NAME_CODEBASE_NAME,
    codebaseNameLabel: CODEBASE_CREATION_NAME_CODEBASE_NAME_LABEL,
};
