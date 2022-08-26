import { pluginLib } from '../../plugin.globals';

const { ApiProxy } = pluginLib;

export const getGitServers = async (namespace: string): Promise<string[]> => {
    const url = `/apis/v2.edp.epam.com/v1/namespaces/${namespace}/gitservers`;

    const { items } = await ApiProxy.request(url);
    return items.map(gitServer => gitServer.metadata.name);
};
