import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPComponentKubeObjectInterface } from '../../types';

export const editEDPComponentInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: EDPComponentKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): EDPComponentKubeObjectInterface => {
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
