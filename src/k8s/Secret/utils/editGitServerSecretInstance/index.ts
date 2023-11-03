import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { SecretKubeObjectInterface } from '../../types';

export const editGitServerSecretInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: SecretKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): SecretKubeObjectInterface => {
    const base = { ...kubeObjectData };

    for (const [propKey, propValue] of Object.entries(formValues)) {
        if (names[propKey].notUsedInFormData) {
            continue;
        }

        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base;
};
