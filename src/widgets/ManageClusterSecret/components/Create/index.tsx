import { Grid } from '@mui/material';
import React from 'react';
import { FormContextProvider } from '../../../../providers/Form/provider';
import { CLUSTER_TYPE } from '../../../../widgets/ManageClusterSecret/constants';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { CreateProps } from './types';

export const Create = ({ formData }: CreateProps) => {
  const [clusterType, setClusterType] = React.useState<string>(CLUSTER_TYPE.BEARER);

  return (
    <FormContextProvider
      formSettings={{
        mode: 'onBlur',
      }}
      formData={formData}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Form clusterType={clusterType} setClusterType={setClusterType} />
        </Grid>
        <Grid item xs={12}>
          <FormActions clusterType={clusterType} />
        </Grid>
      </Grid>
    </FormContextProvider>
  );
};
