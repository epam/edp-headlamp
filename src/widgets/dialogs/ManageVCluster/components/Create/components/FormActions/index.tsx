import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useArgoApplicationCRUD } from '../../../../../../../k8s/groups/ArgoCD/Application/hooks/useArgoApplicationCRUD';
import { ApplicationKubeObjectInterface } from '../../../../../../../k8s/groups/ArgoCD/Application/types';
import { createVClusterApplication } from '../../../../../../../k8s/groups/ArgoCD/Application/utils/createVClusterApplication';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageVClusterFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    state: { closeDialog },
    extra: { EDPConfigMap },
  } = useCurrentDialog();

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useTypedFormContext();

  const handleClose = React.useCallback(() => {
    closeDialog();
    reset();
  }, [closeDialog, reset]);

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const {
    createArgoApplication,
    mutations: { argoApplicationCreateMutation },
  } = useArgoApplicationCRUD();

  const isLoading = argoApplicationCreateMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageVClusterFormValues) => {
      const newVCluster = createVClusterApplication({
        namespace: EDPConfigMap?.data.edp_name,
        clusterName: values.name,
      });
      await createArgoApplication({
        argoApplication: newVCluster as unknown as ApplicationKubeObjectInterface,
      });
      handleClose();
    },
    [EDPConfigMap?.data.edp_name, createArgoApplication, handleClose]
  );

  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
      <Stack direction="row" spacing={1}>
        <Box sx={{ color: theme.palette.text.primary }}>
          <Button onClick={handleClose} size="small" color="inherit">
            cancel
          </Button>
        </Box>
        <Button onClick={handleResetFields} size="small" disabled={!isDirty}>
          undo changes
        </Button>
      </Stack>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant={'contained'}
        color={'primary'}
        size="small"
        disabled={!isDirty || isLoading}
      >
        create
      </Button>
    </Stack>
  );
};
