import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { useCodebaseBranchCRUD } from '../../../../../../../k8s/groups/EDP/CodebaseBranch/hooks/useCodebaseBranchCRUD';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageCodebaseBranchFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    props: { codebaseBranch },
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
    editCodebaseBranch,
    mutations: { codebaseBranchEditMutation },
  } = useCodebaseBranchCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(
    () => codebaseBranchEditMutation.isLoading,
    [codebaseBranchEditMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: ManageCodebaseBranchFormValues) => {
      const usedValues = getUsedValues(values, CODEBASE_BRANCH_FORM_NAMES);
      const newCDPipelineStageData = editResource(
        CODEBASE_BRANCH_FORM_NAMES,
        codebaseBranch,
        usedValues
      );

      await editCodebaseBranch({ codebaseBranchData: newCDPipelineStageData });
    },
    [codebaseBranch, editCodebaseBranch]
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
