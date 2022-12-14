import lodashSet from 'lodash.set';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectConfig } from '../../../../k8s/EDPCDPipelineStage/config';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';

const { kind, group, version } = EDPCDPipelineStageKubeObjectConfig;

export const createCDPipelineStageInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    },
    CDPipeline: DeepPartial<EDPCDPipelineKubeObjectInterface>
): DeepPartial<EDPCDPipelineStageKubeObjectInterface> => {
    const { name, ...restProps } = formValues;

    const base: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: `${CDPipeline.metadata.name}-${name || 'your stage name'}`,
        },
        spec: {
            name: name || `your stage name`,
            cdPipeline: CDPipeline.metadata.name,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        lodashSet(base, propPath, propValue);
    }

    return base;
};

export const editCDPipelineStageInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    kubeObjectData: DeepPartial<EDPCDPipelineStageKubeObjectInterface>,
    formValues: {
        [key: string]: any;
    }
): DeepPartial<EDPCDPipelineStageKubeObjectInterface> => {
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
