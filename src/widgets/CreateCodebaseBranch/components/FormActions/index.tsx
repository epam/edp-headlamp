import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../k8s/common/editResource';
import { useCreateCodebaseBranch } from '../../../../k8s/groups/EDP/CodebaseBranch/hooks/useCreateCodebaseBranch';
import { createCodebaseBranchInstance } from '../../../../k8s/groups/EDP/CodebaseBranch/utils/createCodebaseBranchInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../constants';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../names';
import {
  CreateCodebaseBranchDialogForwardedProps,
  CreateCodebaseBranchFormValues,
} from '../../types';

export const FormActions = () => {
  const {
    forwardedProps: { codebase: codebaseData, defaultBranch },
    closeDialog,
  } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
    CREATE_CODEBASE_BRANCH_DIALOG_NAME
  );

  const {
    reset,
    formState: { isDirty },
    watch,
    handleSubmit,
  } = useFormContext<CreateCodebaseBranchFormValues>();

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const defaultBranchVersionFieldValue = watch(
    CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name
  );
  const defaultBranchPostfixFieldValue = watch(
    CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name
  );
  const newDefaultBranchVersion = React.useMemo(
    () => createVersioningString(defaultBranchVersionFieldValue, defaultBranchPostfixFieldValue),
    [defaultBranchPostfixFieldValue, defaultBranchVersionFieldValue]
  );

  const {
    createCodebaseBranch,
    mutations: { codebaseBranchCreateMutation, codebaseBranchEditMutation },
  } = useCreateCodebaseBranch({
    onSuccess: async () => {
      closeDialog();
    },
  });

  const isLoading = React.useMemo(
    () => codebaseBranchCreateMutation.isLoading || codebaseBranchEditMutation.isLoading,
    [codebaseBranchCreateMutation.isLoading, codebaseBranchEditMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: CreateCodebaseBranchFormValues) => {
      const usedValues = getUsedValues(values, CODEBASE_BRANCH_FORM_NAMES);

      const codebaseBranchInstance = createCodebaseBranchInstance(
        CODEBASE_BRANCH_FORM_NAMES,
        usedValues,
        codebaseData.metadata.name
      );

      if (!!values.release) {
        const newDefaultBranch = editResource(
          {
            version: {
              name: 'version',
              path: ['spec', 'version'],
            },
          },
          defaultBranch,
          { version: newDefaultBranchVersion }
        );
        await createCodebaseBranch({
          codebaseBranchData: codebaseBranchInstance,
          defaultCodebaseBranchData: newDefaultBranch,
        });
      } else {
        await createCodebaseBranch({
          codebaseBranchData: codebaseBranchInstance,
        });
      }
      reset();
    },
    [
      codebaseData.metadata.name,
      reset,
      defaultBranch,
      newDefaultBranchVersion,
      createCodebaseBranch,
    ]
  );

  const theme = useTheme();

  return (
    <Stack direction="row" spacing={2} justifyContent="space-between" width="100%">
      <Stack direction="row" spacing={1}>
        <Box sx={{ color: theme.palette.text.primary }}>
          <Button onClick={closeDialog} size="small" color="inherit">
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
