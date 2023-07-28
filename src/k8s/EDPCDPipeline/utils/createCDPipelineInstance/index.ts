import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { EDPCDPipelineKubeObjectConfig } from '../../config';
import { EDPCDPipelineKubeObjectInterface } from '../../types';

const { kind, group, version } = EDPCDPipelineKubeObjectConfig;

export const createCDPipelineInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    }
): EDPCDPipelineKubeObjectInterface => {
    const { name, ...restProps } = formValues;

    const base: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: name || `your pipeline name`,
        },
        spec: {
            name: name || `your pipeline name`,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base as EDPCDPipelineKubeObjectInterface;
};
