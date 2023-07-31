import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateGitServer } from '../../../../k8s/EDPGitServer/hooks/useCreateGitServer';
import { createGitServerInstance } from '../../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { createGitServerSecretInstance } from '../../../../k8s/Secret/utils/createGitServerSecretInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_GIT_SERVER_DIALOG_NAME } from '../../constants';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { CreateGitServerFormValues } from '../../types';

export const FormActions = () => {
    const { closeDialog } = useSpecificDialogContext<{}>(CREATE_GIT_SERVER_DIALOG_NAME);
    const {
        reset,
        formState: { isDirty },
        getValues,
        handleSubmit,
    } = useFormContext<CreateGitServerFormValues>();

    const handleClose = React.useCallback(() => {
        closeDialog();
        reset();
    }, [closeDialog, reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        createGitServer,
        mutations: {
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
        },
    } = useCreateGitServer({
        onSuccess: handleClose,
    });

    const isApplying =
        gitServerCreateMutation.isLoading ||
        gitServerSecretCreateMutation.isLoading ||
        gitServerSecretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(async () => {
        const values = getValues();
        const usedValues = getUsedValues(values, GIT_SERVER_FORM_NAMES);
        const gitServerData = createGitServerInstance(GIT_SERVER_FORM_NAMES, usedValues);

        const { gitUser, sshPrivateKey, token } = values;

        const gitServerSecretData = createGitServerSecretInstance({
            name: gitServerData.metadata.name,
            gitUser,
            sshPrivateKey,
            token,
        });

        await createGitServer({
            gitServerData: gitServerData,
            gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
        });
    }, [createGitServer, getValues]);

    return (
        <>
            <Button
                onClick={handleResetFields}
                size="small"
                component={'button'}
                disabled={!isDirty}
            >
                undo changes
            </Button>
            <Button
                onClick={closeDialog}
                size="small"
                component={'button'}
                style={{ marginLeft: 'auto' }}
            >
                cancel
            </Button>
            <Button
                onClick={handleSubmit(onSubmit)}
                variant={'contained'}
                color={'primary'}
                size="small"
                disabled={!isDirty || isApplying}
            >
                apply
            </Button>
        </>
    );
};
