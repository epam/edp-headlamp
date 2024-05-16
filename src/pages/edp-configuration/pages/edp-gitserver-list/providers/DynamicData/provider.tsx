import { K8s } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { ConfigMapKubeObject } from '../../../../../../k8s/ConfigMap';
import { EDPGitServerKubeObject } from '../../../../../../k8s/EDPGitServer';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/Secret/labels';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [configMaps, configMapsError] = ConfigMapKubeObject.useList();

  const [ingresses, ingressesError] = K8s.ingress.default.useList();

  const [gitServers, gitServersError] = EDPGitServerKubeObject.useList({});

  const [repositorySecrets, repositorySecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=repository`,
  });

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
