import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { ConfigMapKubeObject } from '../../../../../../k8s/groups/default/ConfigMap';
import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/groups/default/Secret/labels';
import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { GitServerKubeObject } from '../../../../../../k8s/groups/EDP/GitServer';
import { GitServerKubeObjectInterface } from '../../../../../../k8s/groups/EDP/GitServer/types';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [_configMaps, configMapsError] = ConfigMapKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const configMaps = _configMaps as ConfigMapKubeObjectInterface[] | null;

  const [_ingresses, ingressesError] = K8s.ingress.default.useList({
    namespace: getDefaultNamespace(),
  });

  const ingresses = _ingresses as K8s.ingress.default[] | null;

  const [_gitServers, gitServersError] = GitServerKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const gitServers = _gitServers as GitServerKubeObjectInterface[] | null;

  const [_repositorySecrets, repositorySecretsError] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),

    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=repository`,
  });

  const repositorySecrets = _repositorySecrets as SecretKubeObjectInterface[] | null;

  const DataContextValue = React.useMemo(
    () => ({
      gitServers: {
        data: gitServers,
        error: gitServersError,
        isLoading: gitServers === null,
      },
      repositorySecrets: {
        data: repositorySecrets,
        error: repositorySecretsError,
        isLoading: repositorySecrets === null,
      },
      configMaps: {
        data: configMaps,
        error: configMapsError,
        isLoading: configMaps === null,
      },
      ingresses: {
        data: ingresses,
        error: ingressesError,
        isLoading: ingresses === null,
      },
    }),
    [
      configMaps,
      configMapsError,
      gitServers,
      gitServersError,
      ingresses,
      ingressesError,
      repositorySecrets,
      repositorySecretsError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
