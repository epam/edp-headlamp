import { pluginLib } from '../../plugin.globals';

const { ApiProxy } = pluginLib;

export const getNamespaces = async (): Promise<string[]> => {
    const url = `/api/v1/namespaces`;

    const { items } = await ApiProxy.request(url);
    return items.map(namespace => namespace.metadata.name);
};
