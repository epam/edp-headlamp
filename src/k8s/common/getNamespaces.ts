import { pluginLib } from '../../plugin.globals';
import { EDPKubeObjectInterface } from '../../types/k8s';

const { ApiProxy } = pluginLib;

export const getNamespaces = (): Promise<{ items: EDPKubeObjectInterface[] }> => {
    const url = `/api/v1/namespaces`;

    return ApiProxy.request(url);
};
