import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { EDPCodebaseKubeObjectConfig } from '../../config';
import { EDPCodebaseKubeObjectInterface } from '../../types';

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
