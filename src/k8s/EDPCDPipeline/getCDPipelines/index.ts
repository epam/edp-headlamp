import { pluginLib } from '../../../plugin.globals';
import { EDPCDPipelineKubeObjectConfig } from '../config';
import { EDPCDPipelineKubeObjectInterface } from '../types';

const {
    name: { pluralForm },
    group,
    version,
} = EDPCDPipelineKubeObjectConfig;

const { ApiProxy } = pluginLib;

export const getCDPipelines = (namespace: string) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return ApiProxy.request(url) as Promise<EDPCDPipelineKubeObjectInterface>;
};
