import { pluginLib } from '../../plugin.globals';

const { ApiProxy } = pluginLib;

export const getJenkinsSlaves = async (namespace: string) => {
    const url = `/apis/v2.edp.epam.com/v1/namespaces/${namespace}/jenkins`;

    const { items } = await ApiProxy.request(url);
    const [firstJenkinsSlave] = items;
    return firstJenkinsSlave.status.slaves.map(el => el.name);
};
