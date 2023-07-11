import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { EDPCodebaseBranchKubeObjectInterface } from '../../types';

export const editCodebaseBranchInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: EDPCodebaseBranchKubeObjectInterface,
    formValues: {
        [key: string]: any;
    }
): EDPCodebaseBranchKubeObjectInterface => {
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
