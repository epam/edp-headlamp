import lodashSet from 'lodash.set';
import { EDPGitServerKubeObjectConfig } from '../../../../k8s/EDPGitServer/config';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';

const { kind, group, version } = EDPGitServerKubeObjectConfig;

export const createGitServerInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPGitServerKubeObjectInterface> => {
    const { namespace, gitHost, ...restProps } = formValues;

    const base: DeepPartial<EDPGitServerKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: gitHost,
            namespace: namespace || 'your namespace',
        },
        spec: {
            gitHost,
            nameSshKeySecret: `${gitHost}-config`,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        lodashSet(base, propPath, propValue);
    }

    return base;
};
