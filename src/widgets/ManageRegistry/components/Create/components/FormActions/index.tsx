import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageRegistryDataContext, ManageRegistryValues } from '../../../../types';
import { useSetupRegistry } from './hooks/useSetupRegistry';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageRegistryValues>();

    const {
        formData: { handleClosePanel },
    } = useFormContext<ManageRegistryDataContext>();

    const { setupRegistry, isLoading } = useSetupRegistry({
        onSuccess: () => {
            handleClosePanel();
        },
    });

    const onSubmit = React.useCallback(
        async (values: ManageRegistryValues) => {
            await setupRegistry(values);
        },
        [setupRegistry]
    );

    return (
        <>
            <Grid container spacing={2} alignItems={'center'} justifyContent={'flex-end'}>
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
                        disabled={!isDirty || isLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
