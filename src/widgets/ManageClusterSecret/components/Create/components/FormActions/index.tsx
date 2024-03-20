import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createClusterSecretInstance } from '../../../../../../k8s/Secret/utils/createClusterSecretInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../../types';

export const FormActions = () => {
  const {
    formData: { handleClosePlaceholder },
  } = useFormContext<ManageClusterSecretDataContext>();

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageClusterSecretValues>();

  const handleClose = React.useCallback(() => {
    reset();
    handleClosePlaceholder();
  }, [handleClosePlaceholder, reset]);

  const {
    createSecret,
    mutations: { secretCreateMutation },
  } = useSecretCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(() => secretCreateMutation.isLoading, [secretCreateMutation]);

  const onSubmit = React.useCallback(
    async (values: ManageClusterSecretValues) => {
      const { clusterName, clusterHost, clusterToken, clusterCertificate, skipTLSVerify } = values;

      const newClusterSecretData = createClusterSecretInstance({
        clusterName,
        clusterHost,
        clusterToken,
        clusterCertificate,
        skipTLSVerify,
      });

      await createSecret({
        secretData: newClusterSecretData,
      });

      reset();
    },
    [createSecret, reset]
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
              <Button
                type={'button'}
                size={'small'}
                component={'button'}
                variant={'contained'}
                color={'primary'}
                disabled={isLoading || !isDirty}
                onClick={handleSubmit(onSubmit)}
              >
                save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
