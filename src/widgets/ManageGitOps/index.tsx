import { Grid } from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../providers/Form';
import { Create } from './components/Create';
import { FormActions } from './components/FormActions';
import { View } from './components/View';
import { useDefaultValues } from './hooks/useDefaultValues';
import { ManageGitOpsProps } from './types';

export const ManageGitOps = ({ formData }: ManageGitOpsProps) => {
  const baseDefaultValues = useDefaultValues({ formData });

  const { isReadOnly } = formData;

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
          {isReadOnly ? <View /> : <Create />}
        </Grid>
        <Grid item xs={12}>
          <FormActions />
        </Grid>
      </Grid>
    </FormContextProvider>
  );
};
