import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createNexusIntegrationSecretInstance } from '../../../../../../k8s/Secret/utils/createNexusIntegrationSecretInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import {
    ManageNexusIntegrationSecretFormDataContext,
    ManageNexusIntegrationSecretFormValues,
} from '../../../../types';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageNexusIntegrationSecretFormValues>();

    const {
        formData: { handleClosePanel },
    } = useFormContext<ManageNexusIntegrationSecretFormDataContext>();

    const {
        createSecret,
        mutations: { secretCreateMutation, secretEditMutation, secretDeleteMutation },
    } = useSecretCRUD({
        onSuccess: async () => {
            handleClosePanel();
        },
    });

    const isLoading =
        secretCreateMutation.isLoading ||
        secretEditMutation.isLoading ||
        secretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageNexusIntegrationSecretFormValues) => {
            const secretInstance = createNexusIntegrationSecretInstance(values);

            await createSecret({ secretData: secretInstance });
        },
        [createSecret]
    );

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <Button onClick={handleClosePanel} size="small" component={'button'}>
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
