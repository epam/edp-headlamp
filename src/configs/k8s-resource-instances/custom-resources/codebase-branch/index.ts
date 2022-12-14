import lodashSet from 'lodash.set';
import { EDPCodebaseBranchKubeObjectConfig } from '../../../../k8s/EDPCodebaseBranch/config';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';

const { kind, group, version } = EDPCodebaseBranchKubeObjectConfig;

export const createCodebaseBranchInstanceBasedOnFormValues = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    },
    codebaseName: string
): DeepPartial<EDPCodebaseBranchKubeObjectInterface> => {
    const { branchName, ...restProps } = formValues;
    const transformedBranchName = branchName ? branchName.replaceAll('/', '-') : '';

    const base: DeepPartial<EDPCodebaseBranchKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            codebaseName: codebaseName,
            branchName: branchName || 'your branch name',
        },
        metadata: {
            name: `${codebaseName}-${transformedBranchName || 'your branch name'}`,
            labels: {
                'app.edp.epam.com/codebaseName': codebaseName,
            },
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        lodashSet(base, propPath, propValue);
    }

    return base;
};

export const editCodebaseBranchInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: DeepPartial<EDPCodebaseBranchKubeObjectInterface>,
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPCodebaseBranchKubeObjectInterface> => {
    const base = { ...kubeObjectData };

    for (const [propKey, propValue] of Object.entries(formValues)) {
        if (names[propKey].notUsedInFormData) {
            continue;
        }

        const propPath = names[propKey].path;
        lodashSet(base, propPath, propValue);
    }

    return base;
};
