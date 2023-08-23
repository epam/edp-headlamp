import React from 'react';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageSonarIntegrationSecret } from '../../../../widgets/ManageSonarIntegrationSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { SONAR_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findSonarIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === 'sonar-ciuser-token');

export const PageView = () => {
    const [sonarSecret, setSonarSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'sonar',
            dataHandler: data => {
                const sonarSecret = findSonarIntegrationSecret(data);
                setSonarSecret(sonarSecret);
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
        () => (sonarSecret === null ? true : !!sonarSecret),
        [sonarSecret]
    );

    const secretsArray = [sonarSecret].filter(Boolean);

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata.name,
                    ownerReference,
                    component: (
                        <ManageSonarIntegrationSecret
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
                label: SONAR_INTEGRATION_PAGE_DESCRIPTION.label,
                description: SONAR_INTEGRATION_PAGE_DESCRIPTION.description,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create service account',
                disabled: creationDisabled,
                component: (
                    <ManageSonarIntegrationSecret
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={configurationItemList}
            emptyMessage={'No SonarQube integration secrets found'}
        />
    );
};
