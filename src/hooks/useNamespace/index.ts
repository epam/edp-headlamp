import { defaultNamespace } from '../../constants/defaultNamespace';
import { pluginLib } from '../../plugin.globals';

const {
    Utils: { getCluster },
} = pluginLib;

export const useNamespace = () => {
    const namespace =
        JSON.parse(localStorage.getItem(`cluster_settings.${getCluster()}`) || '{}')
            ?.defaultNamespace || defaultNamespace;
    return { namespace };
};
