import React from 'react';
import { Render } from '../../../../components/Render';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageRegistrySecret } from '../../../../widgets/ManageRegistrySecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { REGISTRY_LIST_PAGE_DESCRIPTION } from './constants';

interface Secrets {
    kanikoDockerConfig: SecretKubeObjectInterface;
    regcred: SecretKubeObjectInterface;
}

const generateItemName = (el: SecretKubeObjectInterface) =>
    el?.metadata?.name === 'kaniko-docker-config'
        ? 'Read / Write'
        : el?.metadata?.name === 'regcred'
        ? 'Read Only'
        : el?.metadata?.name;

const findKanikoAndRegcredSecrets = (secrets: SecretKubeObjectInterface[]) => {
    return secrets.reduce(
        (acc, el) => {
            if (el?.metadata?.name === 'kaniko-docker-config') {
                acc.kanikoDockerConfig = el;
            } else if (el?.metadata?.name === 'regcred') {
                acc.regcred = el;
            }
            return acc;
        },
        {
            kanikoDockerConfig: null,
            regcred: null,
        } as Secrets
    );
};

export const PageView = () => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const dockerRegistryURL = EDPComponentsURLS?.['docker-registry'];

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
        regcred: null,
    });

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamRegistrySecrets({
            namespace: getDefaultNamespace(),

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

    const kanikoDockerConfigSecret = secrets.kanikoDockerConfig;
    const regcredSecret = secrets.regcred;
    const secretsArray = [kanikoDockerConfigSecret, regcredSecret].filter(Boolean);
    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: generateItemName(el),
                    ownerReference,
                    component: (
                        <Render condition={!!dockerRegistryURL}>
                            <ManageRegistrySecret
                                formData={{
                                    isReadOnly: !!ownerReference,
                                    currentElement: el,
                                    secrets: [kanikoDockerConfigSecret, regcredSecret],
                                    registryEndpoint: dockerRegistryURL,
                                }}
                            />
                        </Render>
                    ),
                };
            }),
        [secretsArray, dockerRegistryURL, kanikoDockerConfigSecret, regcredSecret]
    );

    const creationDisabled = React.useMemo(() => {
        if (kanikoDockerConfigSecret === null && regcredSecret === null) {
            return true;
        }

        return !!kanikoDockerConfigSecret && !!regcredSecret;
    }, [kanikoDockerConfigSecret, regcredSecret]);

    return (
        <ConfigurationBody
            pageData={{
                label: REGISTRY_LIST_PAGE_DESCRIPTION.label,
                description: REGISTRY_LIST_PAGE_DESCRIPTION.description,
                docUrl: EDP_USER_GUIDE.OVERVIEW.url,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create service account',
                disabled: creationDisabled,
                component: (
                    <Render condition={!!dockerRegistryURL}>
                        <ManageRegistrySecret
                            formData={{
                                currentElement: 'placeholder',
                                secrets: [kanikoDockerConfigSecret, regcredSecret],
                                registryEndpoint: dockerRegistryURL,
                                handleClosePlaceholder,
                            }}
                        />
                    </Render>
                ),
            })}
            items={configurationItemList}
            emptyMessage={'No registry secrets found'}
        />
    );
};
