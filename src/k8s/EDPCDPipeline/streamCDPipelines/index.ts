import { streamResults } from '../../common';
import { EDPCDPipelineKubeObjectConfig } from '../config';
import { EDPCDPipelineKubeObjectInterface } from '../types';
const {
    name: { pluralForm },
    group,
    version,
} = EDPCDPipelineKubeObjectConfig;

export const streamCDPipelines = (
    cb: (data: EDPCDPipelineKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb);
};
