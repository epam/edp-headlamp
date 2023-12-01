import { Icon } from '@iconify/react';
import { Button, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createJiraIntegrationSecretInstance } from '../../../../../../k8s/Secret/utils/createJiraIntegrationSecretInstance';
import {
    useDialogContext,
    useSpecificDialogContext,
} from '../../../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../../../DeleteKubeObject/types';
import {
    ManageJiraIntegrationSecretFormDataContext,
    ManageJiraIntegrationSecretFormValues,
} from '../../../../types';

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
    } = useReactHookFormContext<ManageJiraIntegrationSecretFormValues>();

    const {
        formData: { jiraServerSecret },
    } = useFormContext<ManageJiraIntegrationSecretFormDataContext>();

    const ownerReference = jiraServerSecret?.metadata?.ownerReferences?.[0].kind;
    const isReadOnly = !!ownerReference;

    const {
        editSecret,
        mutations: { secretEditMutation, secretDeleteMutation },
    } = useSecretCRUD({
        onSuccess: async () => {
            closeDialog();
            const values = getValues();
            reset(values);
        },
    });

    const isLoading = secretEditMutation.isLoading || secretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageJiraIntegrationSecretFormValues) => {
            const secretInstance = createJiraIntegrationSecretInstance(values);

            await editSecret({ secretData: secretInstance });
        },
        [editSecret]
    );

    const handleDelete = React.useCallback(async () => {
        setDialog({
            modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
            forwardedProps: {
                kubeObject: SecretKubeObject,
                kubeObjectData: jiraServerSecret as EDPKubeObjectInterface,
                objectName: jiraServerSecret?.metadata.name,
                description: `Confirm the deletion of the secret`,
            },
        });
    }, [jiraServerSecret, setDialog]);

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <IconButton onClick={handleDelete} disabled={isReadOnly}>
                        <Icon icon={ICONS.BUCKET} width="20" />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <Button
                                onClick={() => reset()}
                                size="small"
                                component={'button'}
                                disabled={isReadOnly || !isDirty}
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
                                disabled={isReadOnly || isLoading || !isDirty}
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
