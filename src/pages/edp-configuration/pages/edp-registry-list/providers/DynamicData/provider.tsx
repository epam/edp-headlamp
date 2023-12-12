import React from 'react';
import { useStreamEDPConfigMap } from '../../../../../../k8s/ConfigMap/hooks/useStreamCDPipelineStage';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/Secret/constants';
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
            const itemName = el?.metadata.name;

            if (itemName === REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG) {
                acc.kanikoDockerConfig = el;
            } else if (itemName === REGISTRY_SECRET_NAMES.REGCRED) {
                acc.regcred = el;
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
    const EDPConfigMap = useStreamEDPConfigMap({
        namespace: getDefaultNamespace(),
    });

    const [items] = ServiceAccountKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const tektonServiceAccount = items?.find(el => el?.metadata?.name === 'tekton')?.jsonData;

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
        regcred: null,
    });

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'registry',
            dataHandler: data => {
                const { kanikoDockerConfig, regcred } = findKanikoAndRegcredSecrets(data);

                setSecrets({
                    kanikoDockerConfig,
                    regcred,
                });
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

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
        [EDPConfigMap, isLoading, secrets.kanikoDockerConfig, secrets.regcred, tektonServiceAccount]
    );

    return (
        <DynamicDataContext.Provider value={DataContextValue}>
            {children}
        </DynamicDataContext.Provider>
    );
};
