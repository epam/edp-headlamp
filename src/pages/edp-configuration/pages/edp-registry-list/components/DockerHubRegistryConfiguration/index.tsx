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
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../../../../../widgets/ConfirmResourcesUpdates/constants';
import { ManageDockerHubRegistry } from '../../../../../../widgets/ManageDockerHubRegistry';
import { ConfigurationBody } from '../../../../components/ConfigurationBody';
import { EDP_CONFIG_MAP_NAMES } from '../../names';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';

interface Secrets {
    kanikoDockerConfig: SecretKubeObjectInterface;
    regcred: SecretKubeObjectInterface;
}

const generateItemName = (el: SecretKubeObjectInterface) => {
    const itemName = el?.metadata.name;

    return itemName === REGISTRY_SECRET_NAMES.KANIKO_DOCKER_CONFIG
        ? `${itemName} (Read / Write)`
        : itemName === REGISTRY_SECRET_NAMES.REGCRED
        ? `${itemName} (Read Only)`
        : itemName;
};

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

export const DockerHubRegistryConfiguration = ({ setActiveStep }) => {
    const { EDPConfigMap: data } = useDynamicDataContext();
    const { setDialog } = useDialogContext();

    const containerRegistryHost = data?.data?.container_registry_host;
    const containerRegistrySpace = data?.data?.container_registry_space;

    const [secrets, setSecrets] = React.useState<Secrets>({
        kanikoDockerConfig: null,
        regcred: null,
    });

    const { deleteSecret } = useSecretCRUD({});
    const { editConfigMap } = useConfigMapCRUD({});

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

    const kanikoDockerConfigSecret = secrets.kanikoDockerConfig;
    const regcredSecret = secrets.regcred;
    const secretsArray = [kanikoDockerConfigSecret, regcredSecret].filter(Boolean);
    const configurationItemList = React.useMemo(
        () =>
            secretsArray.map(el => {
                const ownerReference = el?.metadata?.ownerReferences?.[0].kind;
                const key = el?.metadata?.name || el?.metadata?.uid;

                return {
                    id: key,
                    title: generateItemName(el),
                    ownerReference,
                    component: (
                        <ManageDockerHubRegistry
                            formData={{
                                isReadOnly: !!ownerReference,
                                currentElement: el,
                                secrets: [kanikoDockerConfigSecret, regcredSecret],
                                registryEndpoint: containerRegistryHost,
                                registrySpace: containerRegistrySpace,
                            }}
                        />
                    ),
                };
            }),
        [
            secretsArray,
            kanikoDockerConfigSecret,
            regcredSecret,
            containerRegistryHost,
            containerRegistrySpace,
        ]
    );

    const creationDisabled = React.useMemo(() => {
        if (kanikoDockerConfigSecret === null && regcredSecret === null) {
            return true;
        }

        return !!kanikoDockerConfigSecret && !!regcredSecret;
    }, [kanikoDockerConfigSecret, regcredSecret]);

    const items =
        kanikoDockerConfigSecret === null || regcredSecret === null ? null : configurationItemList;

    const isLoading = items === null || data === null;

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

        for (const secret of secretsArray) {
            await deleteSecret({ secretData: secret });
        }

        await editConfigMap({ configMapData: newEDPConfigMap });
        setActiveStep(0);
    }, [
        data,
        deleteSecret,
        editConfigMap,
        secretsArray,
        setActiveStep,
        someOfTheSecretsHasExternalOwner,
    ]);

    const resourcesToUpdate = React.useMemo(() => {
        return [
            {
                actionType: CRUD_TYPES.EDIT,
                kind: data.kind,
                name: data.metadata.name,
            },
            ...secretsArray.map(el => ({
                actionType: CRUD_TYPES.DELETE,
                kind: el.kind,
                name: el.metadata.name,
            })),
        ];
    }, [data, secretsArray]);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ConfigurationBody
                    bodyOnly
                    renderPlaceHolderData={({ handleClosePlaceholder }) => ({
                        title: 'Create service account',
                        disabled: creationDisabled,
                        component: (
                            <ManageDockerHubRegistry
                                key={'placeholder'}
                                formData={{
                                    currentElement: 'placeholder',
                                    handleClosePlaceholder,
                                    secrets: secretsArray,
                                    registryEndpoint: containerRegistryHost,
                                    registrySpace: containerRegistrySpace,
                                }}
                            />
                        ),
                    })}
                    items={isLoading ? null : configurationItemList}
                    emptyMessage={'No Harbor Registry Secrets found'}
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
