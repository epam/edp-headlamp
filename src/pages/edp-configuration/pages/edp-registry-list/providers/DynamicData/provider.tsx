import React from 'react';
import { ConfigMapKubeObject } from '../../../../../../k8s/ConfigMap';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../../../../../../k8s/ConfigMap/constants';
import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/ConfigMap/types';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/Secret/constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/Secret/labels';
import { ServiceAccountKubeObject } from '../../../../../../k8s/ServiceAccount';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [EDPConfigMap, setEDPConfigMap] = React.useState<ConfigMapKubeObjectInterface>(null);

  ConfigMapKubeObject.useApiList(
    (configMaps: ConfigMapKubeObjectInterface[]) => {
      const EDPConfigMap = configMaps.find(
        (item) => item.metadata.name === EDP_CONFIG_CONFIG_MAP_NAME
      );

      if (!EDPConfigMap) {
        setEDPConfigMap(EDPConfigMap);
        return;
      }

      setEDPConfigMap(EDPConfigMap.jsonData);
    },
    (error) => console.error(error),
    {
      namespace: getDefaultNamespace(),
    }
  );

  const [serviceAccounts] = ServiceAccountKubeObject.useList({
    namespace: getDefaultNamespace(),
  });

  const tektonServiceAccount = serviceAccounts?.find(
    (el) => el?.metadata?.name === 'tekton'
  )?.jsonData;

  const [registrySecrets] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=registry`,
    namespace: getDefaultNamespace(),
  });

  const isLoading = React.useMemo(
    () => EDPConfigMap === null || serviceAccounts === null || registrySecrets === null,
    [EDPConfigMap, registrySecrets, serviceAccounts]
  );

  const DataContextValue = React.useMemo(
    () => ({
      data: {
        EDPConfigMap,
        pushAccountSecret: registrySecrets?.find(
          (el) => el.metadata.name === REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG
        )?.jsonData,
        pullAccountSecret: registrySecrets?.find(
          (el) => el.metadata.name === REGISTRY_SECRET_NAMES.REGCRED
        )?.jsonData,
        tektonServiceAccount,
      },
      isLoading,
    }),
    [EDPConfigMap, isLoading, registrySecrets, tektonServiceAccount]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
