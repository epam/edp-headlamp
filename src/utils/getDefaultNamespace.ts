import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { defaultNamespace } from '../constants/defaultNamespace';

export const getDefaultNamespace = (): string => {
  return (
    JSON.parse(localStorage.getItem(`cluster_settings.${Utils.getCluster()}`) || '{}')
      ?.defaultNamespace || defaultNamespace
  );
};
