import { Grid } from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { useDefaultValues } from './hooks/useDefaultValues';
import { EditProps } from './types';

export const Edit = ({ formData }: EditProps) => {
  const baseDefaultValues = useDefaultValues({ formData });

  console.log(baseDefaultValues);

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: baseDefaultValues,
      }}
      formData={formData}
    >
      <Grid container spacing={4}>
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
