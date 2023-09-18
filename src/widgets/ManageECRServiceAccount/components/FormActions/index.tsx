import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useEditServiceAccount } from '../../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../../k8s/ServiceAccount/types';
import { editServiceAccountInstance } from '../../../../k8s/ServiceAccount/utils/editServiceAccount';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../DeleteKubeObject/types';
import { ECR_SERVICE_ACCOUNT_FORM_NAMES } from '../../names';
import {
    ManageECRServiceAccountFormDataContext,
    ManageECRServiceAccountFormValues,
} from '../../types';

export const FormActions = () => {
    const { closeDialog } = useSpecificDialogContext<DeleteKubeObjectDialogForwardedProps>(
        DELETE_KUBE_OBJECT_DIALOG_NAME
    );
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageECRServiceAccountFormValues>();

    const {
        formData: { currentElement, handleClosePlaceholder },
    } = useFormContext<ManageECRServiceAccountFormDataContext>();

    const {
        editServiceAccount,
        mutations: { serviceAccountEditMutation },
    } = useEditServiceAccount({
        onSuccess: async () => {
            closeDialog();
        },
    });

    const isLoading = serviceAccountEditMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageECRServiceAccountFormValues) => {
            const usedValues = getUsedValues(values, ECR_SERVICE_ACCOUNT_FORM_NAMES);
            const editedServiceAccount = editServiceAccountInstance(
                ECR_SERVICE_ACCOUNT_FORM_NAMES,
                currentElement as ServiceAccountKubeObjectInterface,
                usedValues
            );

            await editServiceAccount({ serviceAccount: editedServiceAccount });
        },
        [currentElement, editServiceAccount]
    );

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
                        cancel
                    </Button>
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
                                disabled={isLoading || !isDirty}
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
