import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { ServiceAccountKubeObjectInterface } from '../../types';

export const editServiceAccountInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: ServiceAccountKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): ServiceAccountKubeObjectInterface => {
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
