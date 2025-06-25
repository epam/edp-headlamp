import { Grid } from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../../../providers/Form/provider';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { CreateProps } from './types';

export const Create = ({ formData }: CreateProps) => {
  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
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
