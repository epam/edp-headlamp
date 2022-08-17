import { pluginLib } from '../../plugin.globals';

const { ApiProxy } = pluginLib;

export const getJiraServers = async (namespace: string): Promise<string[]> => {
    const url = `/apis/v2.edp.epam.com/v1/namespaces/${namespace}/jiraservers`;

    const { items } = await ApiProxy.request(url);
    return items.map(jiraServer => jiraServer.metadata.name);
};
