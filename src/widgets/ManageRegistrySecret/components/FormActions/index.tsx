import { Icon } from '@iconify/react';
import { Button, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { DeleteKubeObject } from '../../../../components/DeleteKubeObject';
import { Render } from '../../../../components/Render';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { useRegistrySecretCRUD } from '../../../../k8s/Secret/hooks/useRegistrySecretCRUD';
import { createRegistrySecretInstance } from '../../../../k8s/Secret/utils/createRegistrySecretInstance';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { ManageRegistrySecretFormDataContext, ManageRegistrySecretFormNames } from '../../types';

export const FormActions = () => {
    const { closeDialog } = useDialogContext();
    const [deleteActionPopupOpen, setDeleteActionPopupOpen] = React.useState<boolean>(false);
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useReactHookFormContext<ManageRegistrySecretFormNames>();

    const {
        formData: { currentElement, handleDeleteRow },
    } = useFormContext<ManageRegistrySecretFormDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    const {
        createRegistrySecret,
        editRegistrySecret,
        mutations: {
            registrySecretCreateMutation,
            registrySecretEditMutation,
            registrySecretDeleteMutation,
        },
    } = useRegistrySecretCRUD({
        onSuccess: async () => {
            closeDialog();
            if (isPlaceholder) {
                handleDeleteRow(isPlaceholder);
            }
        },
    });

    const isLoading =
        registrySecretCreateMutation.isLoading ||
        registrySecretEditMutation.isLoading ||
        registrySecretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(async () => {
        const { name, registryEndpoint, user, password } = getValues();
        const registrySecretInstance = createRegistrySecretInstance({
            name,
            registryEndpoint,
            user,
            password,
        });

        if (isPlaceholder) {
            await createRegistrySecret({ registrySecretData: registrySecretInstance });
        } else {
            await editRegistrySecret({ registrySecretData: registrySecretInstance });
        }
    }, [getValues, isPlaceholder, createRegistrySecret, editRegistrySecret]);

    const handleDelete = React.useCallback(async () => {
        if (isPlaceholder) {
            handleDeleteRow(isPlaceholder);
        } else {
            setDeleteActionPopupOpen(true);
        }
    }, [handleDeleteRow, isPlaceholder]);

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <IconButton onClick={handleDelete}>
                        <Icon icon={ICONS.BUCKET} color={'grey'} width="20" />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <Button
                                onClick={() => reset()}
                                size="small"
                                component={'button'}
                                disabled={!isDirty}
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
                                disabled={isLoading}
                                onClick={handleSubmit(onSubmit)}
                            >
                                save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Render condition={!isPlaceholder}>
                <DeleteKubeObject
                    popupOpen={deleteActionPopupOpen}
                    setPopupOpen={setDeleteActionPopupOpen}
                    kubeObject={SecretKubeObject}
                    kubeObjectData={currentElement as EDPKubeObjectInterface}
                    objectName={typeof currentElement !== 'string' && currentElement?.metadata.name}
                    description={`Confirm the deletion of the registry secret`}
                />
            </Render>
        </>
    );
};
