import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPCodebaseKubeObjectInterface } from '../../types';

export const editCodebaseInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: EDPCodebaseKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): EDPCodebaseKubeObjectInterface => {
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
