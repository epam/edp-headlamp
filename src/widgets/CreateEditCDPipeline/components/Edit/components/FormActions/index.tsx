import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useEditCDPipeline } from '../../../../../../k8s/groups/EDP/CDPipeline/hooks/useEditCDPipeline';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import {
  CreateEditCDPipelineDialogForwardedProps,
  CreateEditCDPipelineFormValues,
} from '../../../../types';

export const FormActions = () => {
  const {
    forwardedProps: { CDPipelineData },
    closeDialog,
  } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<CreateEditCDPipelineFormValues>();

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
  } = useEditCDPipeline({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(
    () => CDPipelineEditMutation.isLoading,
    [CDPipelineEditMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: CreateEditCDPipelineFormValues) => {
      const usedValues = getUsedValues(values, CDPIPELINE_FORM_NAMES);
      const newCDPipelineData = editResource(CDPIPELINE_FORM_NAMES, CDPipelineData, usedValues);

      await editCDPipeline({ CDPipelineData: newCDPipelineData });
    },
    [CDPipelineData, editCDPipeline]
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
        apply
      </Button>
    </Stack>
  );
};
