import { Button, Grid, Tooltip } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { useSecretCRUD } from '../../../../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
// import { createClusterSecretInstance } from '../../../../../../k8s/groups/default/Secret/utils/createClusterSecretInstance';
import {
  createBearerClusterSecretInstance,
  createIRSAClusterSecretInstance,
} from '../../../../../../k8s/groups/default/Secret/utils/createClusterSecretInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { CLUSTER_TYPE } from '../../../../constants';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../../types';

export const FormActions = () => {
  const {
    formData: { handleClosePlaceholder, permissions },
  } = useFormContext<ManageClusterSecretDataContext>();

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageClusterSecretValues>();

  const handleClose = React.useCallback(() => {
    reset();
    handleClosePlaceholder && handleClosePlaceholder();
  }, [handleClosePlaceholder, reset]);

  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(() => secretCreateMutation.isLoading, [secretCreateMutation]);

  const onSubmit = React.useCallback(
    (values: ManageClusterSecretValues) => {
      if (!permissions.create.Secret.allowed) {
        return false;
      }

      const {
        clusterType,
        clusterName,
        clusterHost,
        clusterToken,
        clusterCertificate,
        skipTLSVerify,
        roleARN,
        caData,
      } = values;

      if (clusterType === CLUSTER_TYPE.BEARER) {
        createSecret({
          secretData: createBearerClusterSecretInstance({
            clusterName,
            clusterHost,
            clusterToken,
            clusterCertificate,
            skipTLSVerify,
          }),
        });
      } else {
        createSecret({
          secretData: createIRSAClusterSecretInstance({
            clusterName,
            clusterHost,
            roleARN,
            caData,
          }),
        });
      }

      reset();
    },
    [createSecret, permissions.create.Secret.allowed, reset]
  );

  return (
    <>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item>
          <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
            cancel
          </Button>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <Button onClick={() => reset()} size="small" component={'button'} disabled={!isDirty}>
                undo changes
              </Button>
            </Grid>
            <Grid item>
              <ConditionalWrapper
                condition={!permissions.create.Secret.allowed}
                wrapper={(children) => (
                  <Tooltip title={permissions.create.Secret.reason}>
                    <div>{children}</div>
                  </Tooltip>
                )}
              >
                <Button
                  type={'button'}
                  size={'small'}
                  component={'button'}
                  variant={'contained'}
                  color={'primary'}
                  disabled={isLoading || !isDirty || !permissions.create.Secret.allowed}
                  onClick={handleSubmit(onSubmit)}
                >
                  save
                </Button>
              </ConditionalWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
