import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useStageCRUD } from '../../../../../../k8s/groups/EDP/Stage/hooks/useStageCRUD';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    forwardedProps: { stage },
    closeDialog,
  } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(CREATE_EDIT_STAGE_DIALOG_NAME);
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<CreateEditStageFormValues>();

  const handleClose = React.useCallback(() => {
    closeDialog();
    reset();
  }, [closeDialog, reset]);

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const {
    editStage,
    mutations: { stageEditMutation },
  } = useStageCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(() => stageEditMutation.isLoading, [stageEditMutation.isLoading]);

  const onSubmit = React.useCallback(
    async (values: CreateEditStageFormValues) => {
      const usedValues = getUsedValues(values, STAGE_FORM_NAMES);
      const stageData = editResource(STAGE_FORM_NAMES, stage, usedValues);

      await editStage({ stageData });
    },
    [stage, editStage]
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
