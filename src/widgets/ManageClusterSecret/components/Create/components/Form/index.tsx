import { Grid, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../../../types/forms';
import { CLUSTER_TYPE } from '../../../../constants';
import { CLUSTER_FORM_NAMES } from '../../../../names';
import {
  CaData,
  ClusterCertificate,
  ClusterHost,
  ClusterName,
  ClusterToken,
  ClusterType,
  RoleARN,
  SkipTLSVerify,
} from '../../../fields';

export const Form = ({
  clusterType,
  setClusterType,
}: {
  clusterType: string;
  setClusterType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useTheme();
  const { watch } = useFormContext();

  const skipTLSVerify = watch(CLUSTER_FORM_NAMES.SKIP_TLS_VERIFY);

  const renderBearerFormPart = React.useCallback(() => {
    return (
      <>
        <Grid item xs={12}>
          <ClusterToken />
        </Grid>
        <Grid item xs={12} sx={{ mt: theme.typography.pxToRem(20) }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={6}>
              <SkipTLSVerify />
            </Grid>
            {!skipTLSVerify && (
              <Grid item xs={6}>
                <ClusterCertificate />
              </Grid>
            )}
          </Grid>
        </Grid>
      </>
    );
  }, [skipTLSVerify, theme.typography]);

  const renderIRSAFormPart = React.useCallback(() => {
    return (
      <>
        <Grid item xs={6}>
          <CaData />
        </Grid>
        <Grid item xs={6}>
          <RoleARN />
        </Grid>
      </>
    );
  }, []);

  const onClusterChange = React.useCallback(
    (event: FieldEvent) => {
      setClusterType(event.target.value);
    },
    [setClusterType]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ClusterType value={clusterType} onChange={onClusterChange} />
      </Grid>
      <Grid item xs={6}>
        <ClusterName />
      </Grid>
      <Grid item xs={6}>
        <ClusterHost />
      </Grid>
      {clusterType === CLUSTER_TYPE.BEARER ? renderBearerFormPart() : renderIRSAFormPart()}
    </Grid>
  );
};
