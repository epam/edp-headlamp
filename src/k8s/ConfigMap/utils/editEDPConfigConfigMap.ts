import { set } from 'lodash';
import { FormNameObject } from '../../../types/forms';
import { ConfigMapKubeObjectInterface } from '../types';

export const editEDPConfigConfigMap = (
    names: {
        [key: string]: FormNameObject;
    },
    currentConfigMap: ConfigMapKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): ConfigMapKubeObjectInterface => {
    const base = { ...currentConfigMap };

    for (const [propKey, propValue] of Object.entries(formValues)) {
        console.log(propKey, propValue, names);
        if (names[propKey]?.notUsedInFormData) {
            continue;
        }

        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base;
};
