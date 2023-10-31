import { Grid } from '@material-ui/core';
import React from 'react';
import { Render } from '../../components/Render';
import { FormContextProvider } from '../../providers/Form';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { useDefaultValues } from './components/Edit/hooks/useDefaultValues';
import { ManageClusterSecretProps } from './types';

export const ManageClusterSecret = ({ formData }: ManageClusterSecretProps) => {
    const baseDefaultValues = useDefaultValues({ formData });

    const { mode } = formData;

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
                    <Render condition={mode === FORM_MODES.CREATE}>
                        <Create formData={formData} />
                    </Render>
                    <Render condition={mode === FORM_MODES.EDIT}>
                        <Edit formData={formData} />
                    </Render>
                </Grid>
            </Grid>
        </FormContextProvider>
    );
};
