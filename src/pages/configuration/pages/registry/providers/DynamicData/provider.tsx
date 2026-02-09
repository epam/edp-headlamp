import React from 'react';
import { ConfigMapKubeObject } from '../../../../../../k8s/groups/default/ConfigMap';
import { EDP_CONFIG_CONFIG_MAP_NAMES } from '../../../../../../k8s/groups/default/ConfigMap/constants';
import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/groups/default/Secret/constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/groups/default/Secret/labels';
import { ServiceAccountKubeObject } from '../../../../../../k8s/groups/default/ServiceAccount';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [configMaps, configMapsError] = ConfigMapKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

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
        data: (configMaps as ConfigMapKubeObjectInterface[])?.find((el) =>
          EDP_CONFIG_CONFIG_MAP_NAMES.includes(el.metadata.name)
        )?.jsonData,
        isLoading: configMaps === null,
        error: configMapsError,
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
      configMaps,
      configMapsError,
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
