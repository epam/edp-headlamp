import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPGitServerKubeObjectInterface } from '../../types';

export const editGitServerInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: EDPGitServerKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): EDPGitServerKubeObjectInterface => {
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
