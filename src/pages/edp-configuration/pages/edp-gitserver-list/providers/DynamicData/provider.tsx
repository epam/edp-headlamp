import React from 'react';
import { EDPGitServerKubeObject } from '../../../../../../k8s/EDPGitServer';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/Secret/labels';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [gitServers] = EDPGitServerKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const [repositorySecrets] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=repository`,
  });

  const isLoading = React.useMemo(
    () => gitServers === null || repositorySecrets === null,
    [gitServers, repositorySecrets]
  );

  const DataContextValue = React.useMemo(
    () => ({
      data: {
        gitServer: gitServers?.[0]?.jsonData,
        repositorySecrets,
      },
      isLoading,
    }),
    [gitServers, isLoading, repositorySecrets]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
