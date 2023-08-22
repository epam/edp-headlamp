import React from 'react';
import { EDP_USER_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageDefectDojoIntegrationSecret } from '../../../../widgets/ManageDefectDojoIntegrationSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findDefectDojoIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === 'defectdojo-ciuser-token');

export const PageView = () => {
    const [defectDojoSecret, setDefectDojoSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamDefectDojoIntegrationSecrets({
            namespace: getDefaultNamespace(),

            dataHandler: data => {
                const defectDojoSecret = findDefectDojoIntegrationSecret(data);
                setDefectDojoSecret(defectDojoSecret);
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
        () => (defectDojoSecret === null ? true : !!defectDojoSecret),
        [defectDojoSecret]
    );

    const secretsArray = [defectDojoSecret].filter(Boolean);

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata.name,
                    ownerReference,
                    component: (
                        <ManageDefectDojoIntegrationSecret
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
                label: DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION.label,
                description: DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION.description,
                docUrl: EDP_USER_GUIDE.OVERVIEW.url,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create service account',
                disabled: creationDisabled,
                component: (
                    <ManageDefectDojoIntegrationSecret
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={configurationItemList}
            emptyMessage={'No DefectDojo integration secrets found'}
        />
    );
};
