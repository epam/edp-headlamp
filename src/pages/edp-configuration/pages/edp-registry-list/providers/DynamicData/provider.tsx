import React from 'react';
import { ConfigMapKubeObject } from '../../../../../../k8s/ConfigMap';
import { EDP_CONFIG_CONFIG_MAP_NAME } from '../../../../../../k8s/ConfigMap/constants';
import { ConfigMapKubeObjectInterface } from '../../../../../../k8s/ConfigMap/types';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/Secret/constants';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/Secret/labels';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { ServiceAccountKubeObject } from '../../../../../../k8s/ServiceAccount';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

interface Secrets {
    kanikoDockerConfig: SecretKubeObjectInterface;
    regcred: SecretKubeObjectInterface;
}

const findKanikoAndRegcredSecrets = (secrets: SecretKubeObjectInterface[]) => {
    return secrets.reduce(
        (acc, el) => {
            const itemName = el.metadata.name;

            if (itemName === REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG) {
                acc.kanikoDockerConfig = el.jsonData;
            } else if (itemName === REGISTRY_SECRET_NAMES.REGCRED) {
                acc.regcred = el.jsonData;
            }
            return acc;
        },
        {
            kanikoDockerConfig: undefined,
            regcred: undefined,
        } as Secrets
    );
};

export const DynamicDataContextProvider: React.FC = ({ children }) => {
    const [EDPConfigMap, setEDPConfigMap] = React.useState<ConfigMapKubeObjectInterface>(null);

    ConfigMapKubeObject.useApiList(
        (configMaps: ConfigMapKubeObjectInterface[]) => {
            const EDPConfigMap = configMaps.find(
                item => item.metadata.name === EDP_CONFIG_CONFIG_MAP_NAME
            );

            if (!EDPConfigMap) {
                setEDPConfigMap(EDPConfigMap);
                return;
            }

            setEDPConfigMap(EDPConfigMap.jsonData);
        },
        error => console.error(error),
        {
            namespace: getDefaultNamespace(),
        }
    );

    const [items] = ServiceAccountKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const tektonServiceAccount = items?.find(el => el?.metadata?.name === 'tekton')?.jsonData;

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
        regcred: null,
    });

    SecretKubeObject.useApiList(
        (secrets: SecretKubeObjectInterface[]) => {
            const { kanikoDockerConfig, regcred } = findKanikoAndRegcredSecrets(secrets);

            setSecrets({
                kanikoDockerConfig,
                regcred,
            });
        },
        error => console.error(error),
        {
            labelSelector: `${SECRET_LABEL_SECRET_TYPE}=registry`,
            namespace: getDefaultNamespace(),
        }
    );

    const isLoading = React.useMemo(
        () =>
            EDPConfigMap === null ||
            items === null ||
            secrets.kanikoDockerConfig === null ||
            secrets.regcred === null,
        [EDPConfigMap, items, secrets.kanikoDockerConfig, secrets.regcred]
    );

    const DataContextValue = React.useMemo(
        () => ({
            data: {
                EDPConfigMap,
                pushAccountSecret: secrets.kanikoDockerConfig,
                pullAccountSecret: secrets.regcred,
                tektonServiceAccount,
            },
            isLoading,
        }),
        [EDPConfigMap, isLoading, secrets, tektonServiceAccount]
    );

    return (
        <DynamicDataContext.Provider value={DataContextValue}>
            {children}
        </DynamicDataContext.Provider>
    );
};
