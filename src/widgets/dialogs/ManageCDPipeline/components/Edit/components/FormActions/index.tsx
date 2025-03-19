import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { useCDPipelineCRUD } from '../../../../../../../k8s/groups/EDP/CDPipeline/hooks/useCDPIpelineCRUD';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageCDPipelineFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    props: { CDPipelineData },
    state: { closeDialog },
  } = useCurrentDialog();
  const {
    reset,
    formState: { dirtyFields },
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
    editCDPipeline,
    mutations: { CDPipelineEditMutation },
  } = useCDPipelineCRUD();

  const isLoading = React.useMemo(
    () => CDPipelineEditMutation.isLoading,
    [CDPipelineEditMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: ManageCDPipelineFormValues) => {
      const usedValues = getUsedValues(values, CDPIPELINE_FORM_NAMES);
      const newCDPipelineData = editResource(CDPIPELINE_FORM_NAMES, CDPipelineData, usedValues);

      await editCDPipeline({ CDPipelineData: newCDPipelineData, onSuccess: handleClose });
    },
    [CDPipelineData, editCDPipeline, handleClose]
  );

  const theme = useTheme();

  const isDirty = Object.keys(dirtyFields).length;

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
        apply
      </Button>
    </Stack>
  );
};
