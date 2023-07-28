import { Grid } from '@material-ui/core';
import React from 'react';
import { FormContextProvider } from '../../providers/Form';
import { useFormContext } from '../../providers/Form/hooks';
import { FORM_MODES } from '../../types/forms';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';
import { ManageRegistrySecretFormDataContext, ManageRegistrySecretProps } from './types';

export const ManageRegistrySecret = ({ formData }: ManageRegistrySecretProps) => {
    const baseDefaultValues = useDefaultValues({ formData });

    const {
        formData: { currentElement },
    } = useFormContext<ManageRegistrySecretFormDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

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
                    <FormActions mode={isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT} />
                </Grid>
            </Grid>
        </FormContextProvider>
    );
};
