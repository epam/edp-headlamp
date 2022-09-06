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
    const { name, namespace, ...restProps } = formValues;

    const base: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: `${CDPipeline.metadata.name}-${name || 'your stage name'}`,
            namespace: namespace || 'your namespace',
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
