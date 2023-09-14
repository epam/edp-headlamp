import React from 'react';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { ManageDependencyTrackIntegrationSecret } from '../../../../widgets/ManageDependencyTrackIntegrationSecret';
import { ConfigurationBody } from '../../components/ConfigurationBody';
import { DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION } from './constants';

const findDependencyTrackIntegrationSecret = (items: SecretKubeObjectInterface[]) =>
    items?.find(el => el.metadata.name === 'ci-dependency-track');

export const PageView = () => {
    const [dependencyTrackSecret, setDependencyTrackSecret] =
        React.useState<SecretKubeObjectInterface>(null);

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'dependency-track',
            dataHandler: data => {
                const dependencyTrackSecret = findDependencyTrackIntegrationSecret(data);
                setDependencyTrackSecret(dependencyTrackSecret);
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
        () => (dependencyTrackSecret === null ? true : !!dependencyTrackSecret),
        [dependencyTrackSecret]
    );

    const secretsArray = [dependencyTrackSecret].filter(Boolean);

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata.name,
                    ownerReference,
                    component: (
                        <ManageDependencyTrackIntegrationSecret
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
                label: DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION.label,
                description: DEPENDENCY_TRACK_INTEGRATION_PAGE_DESCRIPTION.description,
            }}
            renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                title: 'Create service account',
                disabled: creationDisabled,
                component: (
                    <ManageDependencyTrackIntegrationSecret
                        formData={{
                            currentElement: 'placeholder',
                            handleClosePlaceholder,
                        }}
                    />
                ),
            })}
            items={dependencyTrackSecret === null ? null : configurationItemList}
            emptyMessage={'No DependencyTrack integration secrets found'}
        />
    );
};
