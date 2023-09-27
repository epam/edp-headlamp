import React from 'react';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { INTEGRATION_SECRET_NAMES } from '../../../../k8s/Secret/constants';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSSOIntegrationSecret } from '../../../../widgets/ManageSSOIntegrationSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { SSO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findSSOIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.SSO);

export const PageView = () => {
    const [ssoSecret, setSSOSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'keycloak',
            dataHandler: data => {
                const ssoSecret = findSSOIntegrationSecret(data);
                setSSOSecret(ssoSecret);
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
        () => (ssoSecret === null ? true : !!ssoSecret),
        [ssoSecret]
    );

    const secretsArray = [ssoSecret].filter(Boolean);

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata.name,
                    ownerReference,
                    component: (
                        <ManageSSOIntegrationSecret
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
                label: SSO_INTEGRATION_PAGE_DESCRIPTION.label,
                description: SSO_INTEGRATION_PAGE_DESCRIPTION.description,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create service account',
                disabled: creationDisabled,
                component: (
                    <ManageSSOIntegrationSecret
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={ssoSecret === null ? null : configurationItemList}
            emptyMessage={'No SSO integration secrets found'}
        />
    );
};
