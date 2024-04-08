import React from 'react';
import { EDPGitServerKubeObject } from '../../../../../../k8s/EDPGitServer';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/Secret/labels';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
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
    }),
    [gitServers, gitServersError, repositorySecrets, repositorySecretsError]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
