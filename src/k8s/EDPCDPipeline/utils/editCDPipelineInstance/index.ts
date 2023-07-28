import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPCDPipelineKubeObjectInterface } from '../../types';

export const editCDPipelineInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: EDPCDPipelineKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): EDPCDPipelineKubeObjectInterface => {
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
