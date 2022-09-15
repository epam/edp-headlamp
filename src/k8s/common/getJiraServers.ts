import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/types/lib/k8s/cluster';
import { pluginLib } from '../../plugin.globals';

const { ApiProxy } = pluginLib;

export const getJiraServers = async (
    namespace: string
): Promise<{ items: KubeObjectInterface[] }> => {
    const url = `/apis/v2.edp.epam.com/v1/namespaces/${namespace}/jiraservers`;

    return ApiProxy.request(url);
};
