import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { useStageCRUD } from '../../../../../../../k8s/groups/EDP/Stage/hooks/useStageCRUD';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { STAGE_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageStageFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    props: { stage },
    state: { closeDialog },
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
    editStage,
    mutations: { stageEditMutation },
  } = useStageCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(() => stageEditMutation.isLoading, [stageEditMutation.isLoading]);

  const onSubmit = React.useCallback(
    async (values: ManageStageFormValues) => {
      if (!stage) {
        return;
      }

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
