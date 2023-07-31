import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateClusterSecret } from '../../../../k8s/Secret/hooks/useCreateClusterSecret';
import { createClusterSecretInstance } from '../../../../k8s/Secret/utils/createClusterSecretInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../constants';
import { CLUSTER_CREATION_FORM_NAMES } from '../../names';
import { CreateClusterFormValues } from '../../types';

export const FormActions = () => {
    const { closeDialog } = useSpecificDialogContext(CREATE_CLUSTER_DIALOG_NAME);

    const {
        reset,
        formState: { isDirty },
        getValues,
        handleSubmit,
    } = useFormContext<CreateClusterFormValues>();

    const handleClose = React.useCallback(() => {
        closeDialog();
        reset();
    }, [closeDialog, reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        createClusterSecret,
        mutations: { clusterSecretCreateMutation },
    } = useCreateClusterSecret({
        onSuccess: handleClose,
    });

    const isLoading = React.useMemo(
        () => clusterSecretCreateMutation.isLoading,
        [clusterSecretCreateMutation.isLoading]
    );

    const onSubmit = React.useCallback(async () => {
        const values = getValues();
        const { clusterName, clusterHost, clusterToken, clusterCertificate } = getUsedValues(
            values,
            CLUSTER_CREATION_FORM_NAMES
        );

        const newClusterSecretData = createClusterSecretInstance({
            clusterName,
            clusterHost,
            clusterToken,
            clusterCertificate,
        });

        await createClusterSecret({
            clusterSecretData: newClusterSecretData,
        });
        reset();
    }, [createClusterSecret, getValues, reset]);

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
                disabled={!isDirty || isLoading}
            >
                apply
            </Button>
        </>
    );
};
