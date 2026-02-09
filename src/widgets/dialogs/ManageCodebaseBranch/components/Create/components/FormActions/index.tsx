import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { useCodebaseBranchCRUD } from '../../../../../../../k8s/groups/EDP/CodebaseBranch/hooks/useCodebaseBranchCRUD';
import { createCodebaseBranchInstance } from '../../../../../../../k8s/groups/EDP/CodebaseBranch/utils/createCodebaseBranchInstance';
import { createVersioningString } from '../../../../../../../utils/createVersioningString';
import { getUsedValues } from '../../../../../../../utils/forms/getUsedValues';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageCodebaseBranchFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    props: { codebase, defaultBranch },
    state: { closeDialog },
  } = useCurrentDialog();

  const {
    reset,
    formState: { isDirty },
    watch,
    handleSubmit,
  } = useTypedFormContext();

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

  const handleClose = () => closeDialog();

  const {
    createCodebaseBranch,
    mutations: { codebaseBranchCreateMutation, codebaseBranchEditMutation },
  } = useCodebaseBranchCRUD({
    onSuccess: handleClose,
  });

  const isLoading = React.useMemo(
    () => codebaseBranchCreateMutation.isLoading || codebaseBranchEditMutation.isLoading,
    [codebaseBranchCreateMutation.isLoading, codebaseBranchEditMutation.isLoading]
  );

  const onSubmit = React.useCallback(
    async (values: ManageCodebaseBranchFormValues) => {
      const usedValues = getUsedValues(values, CODEBASE_BRANCH_FORM_NAMES);

      const codebaseBranchInstance = createCodebaseBranchInstance(
        CODEBASE_BRANCH_FORM_NAMES,
        usedValues,
        codebase.metadata.name
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
    [codebase.metadata.name, reset, defaultBranch, newDefaultBranchVersion, createCodebaseBranch]
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
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button onClick={handleResetFields} size="small" disabled={!isDirty}>
          undo changes
        </Button>
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
    </Stack>
  );
};
