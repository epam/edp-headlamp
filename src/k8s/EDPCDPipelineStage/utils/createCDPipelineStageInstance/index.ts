import { set } from 'lodash';
import { FormNameObject } from '../../../../types/forms';
import { DeepPartial } from '../../../../types/global';
import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectConfig } from '../../config';
import { EDPCDPipelineStageKubeObjectInterface } from '../../types';

const { kind, group, version } = EDPCDPipelineStageKubeObjectConfig;

export const createCDPipelineStageInstance = (
    names: {
        [key: string]: FormNameObject;
    },
    formValues: {
        [key: string]: any;
    },
    CDPipeline: EDPCDPipelineKubeObjectInterface
): EDPCDPipelineStageKubeObjectInterface => {
    const { name, ...restProps } = formValues;

    const base: DeepPartial<EDPCDPipelineStageKubeObjectInterface> = {
        apiVersion: `${group}/${version}`,
        kind,
        metadata: {
            name: `${CDPipeline.metadata.name}-${name || 'your stage name'}`,
            namespace: CDPipeline.metadata.namespace,
        },
        spec: {
            name: name || `your stage name`,
            cdPipeline: CDPipeline.metadata.name,
        },
    };

    for (const [propKey, propValue] of Object.entries(restProps)) {
        const propPath = names[propKey].path;
        set(base, propPath, propValue);
    }

    return base as EDPCDPipelineStageKubeObjectInterface;
};
