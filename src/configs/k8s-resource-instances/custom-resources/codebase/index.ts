import { set } from 'lodash';
import { EDPCodebaseKubeObjectConfig } from '../../../../k8s/EDPCodebase/config';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';

const { kind, group, version } = EDPCodebaseKubeObjectConfig;

export const createCodebaseInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    type: string,
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPCodebaseKubeObjectInterface> => {
    const { name, ...restProps } = formValues;

    const base: DeepPartial<EDPCodebaseKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        spec: {
            type,
        },
        metadata: {
            name: name || `your ${type} name`,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base;
};

export const editCodebaseInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: DeepPartial<EDPCodebaseKubeObjectInterface>,
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPCodebaseKubeObjectInterface> => {
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
