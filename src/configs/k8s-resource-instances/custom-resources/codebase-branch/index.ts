import lodashSet from 'lodash.set';
import { EDPCodebaseBranchKubeObjectConfig } from '../../../../k8s/EDPCodebaseBranch/config';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';

const { kind, group, version } = EDPCodebaseBranchKubeObjectConfig;

export const createCodebaseBranchExample = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    },
    codebaseName: string,
    namespace: string
): DeepPartial<EDPCodebaseBranchKubeObjectInterface> => {
    const { branchName, ...restProps } = formValues;

    const base: DeepPartial<EDPCodebaseBranchKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            codebaseName: codebaseName,
            branchName: branchName || 'your branch name',
        },
        metadata: {
            name: `${codebaseName}-${branchName || 'your branch name'}`,
            namespace: namespace,
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
