import { Icon } from '@iconify/react';
import { Button, Grid, Tooltip } from '@material-ui/core';
import React from 'react';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { CRUD_TYPES } from '../../../../../../constants/crudTypes';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useConfigMapCRUD } from '../../../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { editEDPConfigConfigMap } from '../../../../../../k8s/ConfigMap/utils/editEDPConfigConfigMap';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { REGISTRY_SECRET_NAMES } from '../../../../../../k8s/Secret/constants';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useRegistrySecretCRUD';
import { SecretKubeObjectInterface } from '../../../../../../k8s/Secret/types';
import { ServiceAccountKubeObject } from '../../../../../../k8s/ServiceAccount';
import { useEditServiceAccount } from '../../../../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../../../../k8s/ServiceAccount/types';
import { editServiceAccountInstance } from '../../../../../../k8s/ServiceAccount/utils/editServiceAccount';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../../../../../widgets/ConfirmResourcesUpdates/constants';
import { ManageECRRegistry } from '../../../../../../widgets/ManageECRRegistry';
import { ECR_REGISTRY_FORM_NAMES } from '../../../../../../widgets/ManageECRRegistry/names';
import { ConfigurationBody } from '../../../../components/ConfigurationBody';
import { EDP_CONFIG_MAP_NAMES } from '../../names';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';

interface Secrets {
    kanikoDockerConfig: SecretKubeObjectInterface;
}

const findKanikoAndRegcredSecrets = (secrets: SecretKubeObjectInterface[]) => {
    return secrets.reduce(
        (acc, el) => {
            const itemName = el?.metadata.name;

            if (itemName === REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG) {
                acc.kanikoDockerConfig = el;
            }
            return acc;
        },
        {
            kanikoDockerConfig: undefined,
        } as Secrets
    );
};

export const ECRConfiguration = ({ setActiveStep }) => {
    const { EDPConfigMap: data } = useDynamicDataContext();
    const { setDialog } = useDialogContext();
    const { deleteSecret } = useSecretCRUD({});
    const { editConfigMap } = useConfigMapCRUD({});
    const { editServiceAccount } = useEditServiceAccount({});
    const containerRegistryHost = data?.data?.container_registry_host;
    const containerRegistrySpace = data?.data?.container_registry_space;

    const [items] = ServiceAccountKubeObject.useList({
        namespace: getDefaultNamespace(),
    });

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
    });

    React.useEffect(() => {
        const cancelStream = SecretKubeObject.streamSecretsByType({
            namespace: getDefaultNamespace(),
            type: 'registry',
            dataHandler: data => {
                const { kanikoDockerConfig } = findKanikoAndRegcredSecrets(data);

                setSecrets({
                    kanikoDockerConfig,
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
    const secretsArray = [kanikoDockerConfigSecret].filter(Boolean);

    const tektonServiceAccount = items?.find(el => el?.metadata?.name === 'tekton')?.jsonData;
    const irsaRoleArn = tektonServiceAccount?.metadata?.annotations?.['eks.amazonaws.com/role-arn'];

    const isLoading = items === null || data === null;

    const creationDisabled = !!secretsArray.length;

    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;

                return {
                    id: el?.metadata?.name || el?.metadata?.uid,
                    title: el?.metadata?.name,
                    ownerReference,
                    component: (
                        <ManageECRRegistry
                            formData={{
                                currentElement: el,
                                secrets: secretsArray,
                                registryEndpoint: containerRegistryHost,
                                registrySpace: containerRegistrySpace,
                                tektonServiceAccount,
                                irsaRoleArn,
                            }}
                        />
                    ),
                };
            }),
        [
            secretsArray,
            containerRegistryHost,
            containerRegistrySpace,
            tektonServiceAccount,
            irsaRoleArn,
        ]
    );

    const someOfTheSecretsHasExternalOwner = secretsArray.some(el => el?.metadata?.ownerReferences);

    const handleResetRegistry = React.useCallback(async () => {
        if (someOfTheSecretsHasExternalOwner) {
            return;
        }

        const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, data, {
            registryHost: '',
            registrySpace: '',
            registryType: '',
        });

        const editedServiceAccount = editServiceAccountInstance(
            ECR_REGISTRY_FORM_NAMES,
            tektonServiceAccount as ServiceAccountKubeObjectInterface,
            {
                irsaRoleArn: '',
            }
        );

        for (const secret of secretsArray) {
            await deleteSecret({ secretData: secret });
        }
        await editServiceAccount({ serviceAccount: editedServiceAccount });
        await editConfigMap({ configMapData: newEDPConfigMap });
        setActiveStep(0);
    }, [
        data,
        deleteSecret,
        editConfigMap,
        editServiceAccount,
        secretsArray,
        setActiveStep,
        someOfTheSecretsHasExternalOwner,
        tektonServiceAccount,
    ]);

    const resourcesToUpdate = React.useMemo(() => {
        if (!data || !tektonServiceAccount) {
            return;
        }

        return [
            {
                actionType: CRUD_TYPES.EDIT,
                kind: data.kind,
                name: data.metadata.name,
            },
            {
                actionType: CRUD_TYPES.EDIT,
                kind: tektonServiceAccount.kind,
                name: tektonServiceAccount.metadata.name,
            },
            ...secretsArray.map(el => ({
                actionType: CRUD_TYPES.DELETE,
                kind: el.kind,
                name: el.metadata.name,
            })),
        ];
    }, [data, secretsArray, tektonServiceAccount]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ConfigurationBody
                    bodyOnly
                    renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                        title: 'Create service account',
                        disabled: creationDisabled,
                        component: (
                            <ManageECRRegistry
                                formData={{
                                    currentElement: 'placeholder',
                                    secrets: secretsArray,
                                    registryEndpoint: containerRegistryHost,
                                    registrySpace: containerRegistrySpace,
                                    tektonServiceAccount,
                                    irsaRoleArn,
                                    handleClosePlaceholder,
                                }}
                            />
                        ),
                    })}
                    items={isLoading ? null : configurationItemList}
                    emptyMessage={'No ECR Secrets found'}
                />
            </Grid>
            <Grid item style={{ marginLeft: 'auto' }}>
                <ConditionalWrapper
                    condition={someOfTheSecretsHasExternalOwner}
                    wrapper={children => {
                        return (
                            <Tooltip
                                title={
                                    'Some of the secrets has external owners. Please, delete it by your own.'
                                }
                            >
                                {children}
                            </Tooltip>
                        );
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ pointerEvents: 'auto' }}
                        onClick={() =>
                            setDialog({
                                modalName: CONFIRM_RESOURCES_UPDATES_DIALOG_NAME,
                                forwardedProps: {
                                    deleteCallback: handleResetRegistry,
                                    resourcesArray: resourcesToUpdate,
                                },
                            })
                        }
                        startIcon={<Icon icon={ICONS.WARNING} />}
                        disabled={someOfTheSecretsHasExternalOwner || !secretsArray.length}
                    >
                        Reset registry
                    </Button>
                </ConditionalWrapper>
            </Grid>
        </Grid>
    );
};
