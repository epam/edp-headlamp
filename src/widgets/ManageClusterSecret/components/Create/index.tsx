import { Grid } from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../../../providers/Form/provider';
import { CLUSTER_TYPE } from '../../constants';
import { CLUSTER_FORM_NAMES } from '../../names';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { CreateProps } from './types';

export const Create = ({ formData }: CreateProps) => {
  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
        defaultValues: {
          [CLUSTER_FORM_NAMES.CLUSTER_TYPE]: CLUSTER_TYPE.BEARER,
        },
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
