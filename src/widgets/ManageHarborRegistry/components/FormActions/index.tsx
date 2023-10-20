import { Icon } from '@iconify/react';
import { Button, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useConfigMapCRUD } from '../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { editEDPConfigConfigMap } from '../../../../k8s/ConfigMap/utils/editEDPConfigConfigMap';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { useSecretCRUD } from '../../../../k8s/Secret/hooks/useRegistrySecretCRUD';
import { createRegistrySecretInstance } from '../../../../k8s/Secret/utils/createRegistrySecretInstance';
import { EDP_CONFIG_MAP_NAMES } from '../../../../pages/edp-configuration/pages/edp-registry-list/names';
import { useDynamicDataContext } from '../../../../pages/edp-configuration/pages/edp-registry-list/providers/DynamicData/hooks';
import { useDialogContext, useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../DeleteKubeObject/types';
import { ManageHarborRegistryFormDataContext, ManageHarborRegistryFormValues } from '../../types';

export const FormActions = () => {
    const { setDialog } = useDialogContext();
    const { closeDialog } = useSpecificDialogContext<DeleteKubeObjectDialogForwardedProps>(
        DELETE_KUBE_OBJECT_DIALOG_NAME
    );
    const { EDPConfigMap: data } = useDynamicDataContext();
    const configMapIsLoading = data === null;
    const { editConfigMap } = useConfigMapCRUD({});

    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useReactHookFormContext<ManageHarborRegistryFormValues>();

    const {
        formData: { currentElement, handleClosePlaceholder, isReadOnly },
    } = useFormContext<ManageHarborRegistryFormDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';
    const mode = isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT;

    const {
        createSecret,
        editSecret,
        mutations: { secretCreateMutation, secretEditMutation, secretDeleteMutation },
    } = useSecretCRUD({
        onSuccess: async () => {
            closeDialog();

            if (mode === FORM_MODES.CREATE) {
                handleClosePlaceholder();
            }
        },
    });

    const isLoading =
        secretCreateMutation.isLoading ||
        secretEditMutation.isLoading ||
        secretDeleteMutation.isLoading ||
        configMapIsLoading;

    const onSubmit = React.useCallback(async () => {
        const { name, registryHost, user, password, registrySpace } = getValues();
        const registrySecretInstance = createRegistrySecretInstance({
            name,
            registryEndpoint: registryHost,
            user,
            password,
        });

        const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, data, {
            registryHost,
            registrySpace,
        });

        await editConfigMap({ configMapData: newEDPConfigMap });

        if (mode === FORM_MODES.CREATE) {
            await createSecret({ secretData: registrySecretInstance });
        } else {
            await editSecret({ secretData: registrySecretInstance });
        }

        setTimeout(() => reset(), 100);
    }, [reset, getValues, data, editConfigMap, mode, createSecret, editSecret]);

    const handleDelete = React.useCallback(async () => {
        setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: {
                kubeObject: SecretKubeObject,
                kubeObjectData: currentElement as EDPKubeObjectInterface,
                objectName: typeof currentElement !== 'string' && currentElement?.metadata.name,
                description: `Confirm the deletion of the registry secret`,
            },
        });
    }, [currentElement, setDialog]);

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <Render condition={mode === FORM_MODES.EDIT}>
                        <IconButton onClick={handleDelete} disabled={isReadOnly}>
                            <Icon icon={ICONS.BUCKET} width="20" />
                        </IconButton>
                    </Render>
                    <Render condition={mode === FORM_MODES.CREATE}>
                        <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
                            cancel
                        </Button>
                    </Render>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <Button
                                onClick={() => reset()}
                                size="small"
                                component={'button'}
                                disabled={!isDirty || isReadOnly}
                            >
                                undo changes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type={'button'}
                                size={'small'}
                                component={'button'}
                                variant={'contained'}
                                color={'primary'}
                                disabled={isLoading || isReadOnly || !isDirty}
                                onClick={handleSubmit(onSubmit)}
                            >
                                save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
