import { pluginLib } from '../../../plugin.globals';
import { EDPCDPipelineStageKubeObjectConfig } from '../config';
import { EDPCDPipelineStageKubeObjectInterface } from '../types';

const {
    name: { pluralForm },
    group,
    version,
} = EDPCDPipelineStageKubeObjectConfig;

const { ApiProxy } = pluginLib;

export const getCDPipelinesStages = (namespace: string) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return ApiProxy.request(url) as Promise<EDPCDPipelineStageKubeObjectInterface>;
};
