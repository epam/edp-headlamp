import lodashSet from 'lodash.set';
import { EDPCDPipelineKubeObjectConfig } from '../../../../k8s/EDPCDPipeline/config';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';

const { kind, group, version } = EDPCDPipelineKubeObjectConfig;

export const createCDPipelineInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPCDPipelineKubeObjectInterface> => {
    const { name, namespace, ...restProps } = formValues;

    const base: DeepPartial<EDPCDPipelineKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: name || `your pipeline name`,
            namespace: namespace || 'your namespace',
        },
        spec: {
            name: name || `your pipeline name`,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        lodashSet(base, propPath, propValue);
    }

    return base;
};

export const editCDPipelineInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: DeepPartial<EDPCDPipelineKubeObjectInterface>,
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPCDPipelineKubeObjectInterface> => {
    const base = { ...kubeObjectData };

    for (const [propKey, propValue] of Object.entries(formValues)) {
        if (names[propKey].notUsedInFormData) {
            continue;
        }

        const propPath = names[propKey].path;
        lodashSet(base, propPath, propValue);
    }

    return base;
};
