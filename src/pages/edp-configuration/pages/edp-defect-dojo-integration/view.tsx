import React from 'react';
import { EDP_OPERATOR_GUIDE } from '../../../../constants/urls';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { INTEGRATION_SECRET_NAMES } from '../../../../k8s/Secret/constants';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageDefectDojoIntegrationSecret } from '../../../../widgets/ManageDefectDojoIntegrationSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { DEFECT_DOJO_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findDefectDojoIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === INTEGRATION_SECRET_NAMES.DEFECT_DOJO);

export const PageView = () => {
    const [defectDojoSecret, setDefectDojoSecret] = React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'defectdojo',

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
                docUrl: EDP_OPERATOR_GUIDE.DEFECT_DOJO.url,
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
            items={defectDojoSecret === null ? null : configurationItemList}
            emptyMessage={'No DefectDojo integration secrets found'}
        />
    );
};
