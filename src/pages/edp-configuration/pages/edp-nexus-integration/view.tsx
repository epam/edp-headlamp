import React from 'react';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageNexusIntegrationSecret } from '../../../../widgets/ManageNexusIntegrationSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { NEXUS_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findNexusIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === 'nexus-ci.user');

export const PageView = () => {
    const [nexusSecret, setNexusSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'nexus',
            dataHandler: data => {
                const nexusSecret = findNexusIntegrationSecret(data);
                setNexusSecret(nexusSecret);
            },
            errorHandler: error => {
                console.error(error);
            },
        });

        return () => {
            cancelStream();
        };
    }, []);

    const creationDisabled = React.useMemo(
        () => (nexusSecret === null ? true : !!nexusSecret),
        [nexusSecret]
    );

    const secretsArray = [nexusSecret].filter(Boolean);

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata.name,
                    ownerReference,
                    component: (
                        <ManageNexusIntegrationSecret
                            formData={{
                                isReadOnly: !!ownerReference,
                                currentElement: el,
                            }}
                        />
                    ),
                };
            }),
        [secretsArray]
    );

    return (
        <ConfigurationBody
            pageData={{
                label: NEXUS_INTEGRATION_PAGE_DESCRIPTION.label,
                description: NEXUS_INTEGRATION_PAGE_DESCRIPTION.description,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create service account',
                disabled: creationDisabled,
                component: (
                    <ManageNexusIntegrationSecret
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={configurationItemList}
            emptyMessage={'No Nexus integration secrets found'}
        />
    );
};
