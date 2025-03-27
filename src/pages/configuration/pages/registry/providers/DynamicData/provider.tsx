import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useEDPConfigMapQuery } from '../../../../../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/groups/default/Secret/constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/groups/default/Secret/labels';
import { ServiceAccountKubeObject } from '../../../../../../k8s/groups/default/ServiceAccount';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const {
    data: EDPConfigMap,
    isLoading: isEDPConfigMapLoading,
    error: EDPConfigMapError,
  } = useEDPConfigMapQuery();

  const [serviceAccounts, serviceAccountsError] = ServiceAccountKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const tektonServiceAccount = serviceAccounts?.find(
    (el) => el?.metadata?.name === 'tekton'
  )?.jsonData;

  const [registrySecrets, registrySecretsError] = SecretKubeObject.useList({
    namespace: getDefaultNamespace(),
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=registry`,
  });

  const DataContextValue = React.useMemo(
    () => ({
      EDPConfigMap: {
        data: EDPConfigMap,
        isLoading: isEDPConfigMapLoading,
        error: EDPConfigMapError as ApiError,
      },
      pushAccountSecret: {
        data: registrySecrets?.find(
          (el) => el.metadata.name === REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG
        )?.jsonData,
        isLoading: registrySecrets === null,
        error: registrySecretsError,
      },
      pullAccountSecret: {
        data: registrySecrets?.find((el) => el.metadata.name === REGISTRY_SECRET_NAMES.REGCRED)
          ?.jsonData,
        isLoading: registrySecrets === null,
        error: registrySecretsError,
      },
      tektonServiceAccount: {
        data: tektonServiceAccount,
        isLoading: serviceAccounts === null,
        error: serviceAccountsError,
      },
    }),
    [
      EDPConfigMap,
      EDPConfigMapError,
      isEDPConfigMapLoading,
      registrySecrets,
      registrySecretsError,
      serviceAccounts,
      serviceAccountsError,
      tektonServiceAccount,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
