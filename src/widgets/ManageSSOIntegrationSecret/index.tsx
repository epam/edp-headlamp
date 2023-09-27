import { Grid } from '@material-ui/core';
import React from 'react';
import { FormContextProvider } from '../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';
import { ManageSSOIntegrationSecretProps } from './types';

export const ManageSSOIntegrationSecret = ({ formData }: ManageSSOIntegrationSecretProps) => {
    const baseDefaultValues = useDefaultValues({ formData });

    return (
        <FormContextProvider
            formSettings={{
                defaultValues: baseDefaultValues,
                mode: 'onBlur',
            }}
            formData={formData}
        >
            <Grid container spacing={2} data-testid="form">
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
