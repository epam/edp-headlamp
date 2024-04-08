import React from 'react';
import { ConfigMapKubeObject } from '../../../../../../k8s/ConfigMap';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../../../../../../k8s/ConfigMap/constants';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/Secret/constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/Secret/labels';
import { ServiceAccountKubeObject } from '../../../../../../k8s/ServiceAccount';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [configMaps, configMapsError] = ConfigMapKubeObject.useList();

  const EDPConfigMap = configMaps?.find(
    (item) => item.metadata.name === EDP_CONFIG_CONFIG_MAP_NAME
  );

  const [serviceAccounts, serviceAccountsError] = ServiceAccountKubeObject.useList();

  const tektonServiceAccount = serviceAccounts?.find(
    (el) => el?.metadata?.name === 'tekton'
  )?.jsonData;

  const [registrySecrets, registrySecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=registry`,
  });

  const DataContextValue = React.useMemo(
    () => ({
      EDPConfigMap: {
        data: EDPConfigMap?.jsonData,
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
        data: tektonServiceAccount?.jsonData,
        isLoading: serviceAccounts === null,
        error: serviceAccountsError,
      },
    }),
    [
      EDPConfigMap,
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
