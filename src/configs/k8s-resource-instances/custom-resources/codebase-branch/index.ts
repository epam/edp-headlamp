import lodashSet from 'lodash.set';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
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

export const createDefaultCodebaseBranchInstance = (
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>
): DeepPartial<EDPCodebaseBranchKubeObjectInterface> => {
    const {
        spec: { defaultBranch, versioning },
        metadata: { name: codebaseName, namespace },
    } = codebaseData;

    const isEDPVersioning = versioning.type === 'edp';

    const base: DeepPartial<EDPCodebaseBranchKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            codebaseName,
            branchName: defaultBranch,
            fromCommit: '',
            release: false,
        },
        metadata: {
            name: `${codebaseName}-${defaultBranch}`,
            namespace,
            labels: {
                'app.edp.epam.com/codebaseName': codebaseName,
            },
        },
    };

    if (isEDPVersioning) {
        base.status = {
            versionHistory: [versioning.startFrom],
        };
        base.spec.version = versioning.startFrom;
    }

    return base;
};
