import { Utils } from '@kinvolk/headlamp-plugin/lib';

export const getClusterSettings = () => {
  const clusterName = Utils.getCluster();

  if (!clusterName) {
    return {};
  }
  return JSON.parse(localStorage.getItem(`cluster_settings.${clusterName}`) || '{}');
};
