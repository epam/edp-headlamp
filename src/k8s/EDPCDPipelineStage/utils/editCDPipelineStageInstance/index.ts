import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPCDPipelineStageKubeObjectInterface } from '../../types';

export const editCDPipelineStageInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: EDPCDPipelineStageKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): EDPCDPipelineStageKubeObjectInterface => {
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
