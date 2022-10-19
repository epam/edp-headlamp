import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { pluginLib } from '../../plugin.globals';
import { EDPComponentKubeObjectConfig } from '../EDPComponent/config';

const { ApiProxy } = pluginLib;
const {
    group,
    version,
    name: { pluralForm },
} = EDPComponentKubeObjectConfig;

export const getEDPComponents = (namespace: string): Promise<{ items: KubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
};
