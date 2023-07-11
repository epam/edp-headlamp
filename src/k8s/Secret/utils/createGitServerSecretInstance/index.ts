import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { EDPKubeObjectInterface } from '../../../../types/k8s';

export const createGitServerSecretInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPKubeObjectInterface> => {
    const { name, ...restProps } = formValues;

    const base: DeepPartial<EDPKubeObjectInterface> = {
        apiVersion: 'v1',
        kind: 'Secret',
        metadata: {
            name: `${name}-config`,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base;
};
