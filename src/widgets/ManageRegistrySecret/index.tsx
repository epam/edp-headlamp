import { Grid } from '@material-ui/core';
import React from 'react';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';
import { ManageRegistrySecretProps } from './types';

export const ManageRegistrySecret = ({ formData }: ManageRegistrySecretProps) => {
    const { activeDialog } = useDialogContext();
    const baseDefaultValues = useDefaultValues({ formData });

    if (!activeDialog) {
        return null;
    }

    return (
        <FormContextProvider
            formSettings={{
                defaultValues: baseDefaultValues,
                mode: 'onBlur',
            }}
            formData={formData}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Form />
                </Grid>
                <Grid item xs={12}>
                    <FormActions />
                </Grid>
            </Grid>
        </FormContextProvider>
    );
};
