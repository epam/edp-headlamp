import { pluginLib } from '../../plugin.globals';
import { EDPGitServerKubeObjectInterface } from '../EDPGitServer/types';

const { ApiProxy } = pluginLib;

export const getGitServers = (
    namespace: string
): Promise<{ items: EDPGitServerKubeObjectInterface[] }> => {
    const url = `/apis/v2.edp.epam.com/v1/namespaces/${namespace}/gitservers`;

    return ApiProxy.request(url);
};
