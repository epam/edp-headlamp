import { Icon } from '@iconify/react';
import { Button, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { useSecretCRUD } from '../../../../k8s/Secret/hooks/useSecretCRUD';
import { createSonarQubeIntegrationSecretInstance } from '../../../../k8s/Secret/utils/createSonarQubeIntegrationSecretInstance';
import { useDialogContext, useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../DeleteKubeObject/types';
import {
    ManageSonarIntegrationSecretFormDataContext,
    ManageSonarIntegrationSecretFormValues,
} from '../../types';

export const FormActions = () => {
    const { setDialog } = useDialogContext();
    const { closeDialog } = useSpecificDialogContext<DeleteKubeObjectDialogForwardedProps>(
        DELETE_KUBE_OBJECT_DIALOG_NAME
    );
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useReactHookFormContext<ManageSonarIntegrationSecretFormValues>();

    const {
        formData: { currentElement, handleClosePlaceholder, isReadOnly },
    } = useFormContext<ManageSonarIntegrationSecretFormDataContext>();

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
            } else {
                const values = getValues();
                reset(values);
            }
        },
    });

    const isLoading =
        secretCreateMutation.isLoading ||
        secretEditMutation.isLoading ||
        secretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageSonarIntegrationSecretFormValues) => {
            const secretInstance = createSonarQubeIntegrationSecretInstance(values);

            if (mode === FORM_MODES.CREATE) {
                await createSecret({ secretData: secretInstance });
            } else {
                await editSecret({ secretData: secretInstance });
            }
        },
        [mode, createSecret, editSecret]
    );

    const handleDelete = React.useCallback(async () => {
        setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: {
                kubeObject: SecretKubeObject,
                kubeObjectData: currentElement as EDPKubeObjectInterface,
                objectName: typeof currentElement !== 'string' && currentElement?.metadata.name,
                description: `Confirm the deletion of the secret`,
            },
        });
    }, [currentElement, setDialog]);

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    {mode === FORM_MODES.EDIT && (
                        <IconButton onClick={handleDelete} disabled={isReadOnly}>
                            <Icon icon={ICONS.BUCKET} width="20" />
                        </IconButton>
                    )}
                    {mode === FORM_MODES.CREATE && (
                        <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
                            cancel
                        </Button>
                    )}
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
