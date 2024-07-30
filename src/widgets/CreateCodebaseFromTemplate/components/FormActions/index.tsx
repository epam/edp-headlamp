import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { useCodebaseCRUD } from '../../../../k8s/groups/EDP/Codebase/hooks/useCodebaseCRUD';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { createCodebaseInstance } from '../../../../k8s/groups/EDP/Codebase/utils/createCodebaseInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../constants';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../names';
import {
  CreateCodebaseFromTemplateDialogForwardedProps,
  CreateCodebaseFromTemplateFormValues,
} from '../../types';

export const FormActions = () => {
  const { closeDialog } = useSpecificDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>(
    CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME
  );

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<CreateCodebaseFromTemplateFormValues>();

  const {
    createCodebase,
    mutations: { codebaseCreateMutation },
  } = useCodebaseCRUD({
    onSuccess: () => {
      closeDialog();
      reset();
    },
  });

  const onSubmit = React.useCallback(
    async (values) => {
      const usedValues = getUsedValues(values, CODEBASE_FROM_TEMPLATE_FORM_NAMES);

      const codebaseInstance = createCodebaseInstance(CODEBASE_FROM_TEMPLATE_FORM_NAMES, {
        ...usedValues,
        ciTool: CI_TOOLS.TEKTON,
      });

      await createCodebase({
        codebaseData: codebaseInstance as CodebaseKubeObjectInterface,
        codebaseAuthData: null,
      });
    },
    [createCodebase]
  );

  const theme = useTheme();

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

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
        type={'submit'}
        onClick={handleSubmit(onSubmit)}
        variant={'contained'}
        color={'primary'}
        size="small"
        disabled={!isDirty || codebaseCreateMutation.isLoading}
      >
        create
      </Button>
    </Stack>
  );
};
