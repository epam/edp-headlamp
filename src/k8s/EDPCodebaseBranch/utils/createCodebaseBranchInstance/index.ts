import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPCodebaseBranchKubeObjectConfig } from '../../config';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from '../../labels';
import { EDPCodebaseBranchKubeObjectInterface } from '../../types';

const { kind, group, version } = EDPCodebaseBranchKubeObjectConfig;

export const createCodebaseBranchInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    },
    codebaseName: string
): EDPCodebaseBranchKubeObjectInterface => {
    const { branchName, ...restProps } = formValues;
    const transformedBranchName = branchName ? branchName.replaceAll('/', '-') : '';

    const base = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            codebaseName: codebaseName,
            branchName: branchName || 'your branch name',
        },
        metadata: {
            name: `${codebaseName}-${transformedBranchName || 'your branch name'}`,
            labels: {
                [CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME]: codebaseName,
            },
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base as unknown as EDPCodebaseBranchKubeObjectInterface;
};
