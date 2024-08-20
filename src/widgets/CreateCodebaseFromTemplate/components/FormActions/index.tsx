import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CI_TOOLS } from '../../../../constants/ciTools';
import { useCodebaseCRUD } from '../../../../k8s/groups/EDP/Codebase/hooks/useCodebaseCRUD';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { createCodebaseInstance } from '../../../../k8s/groups/EDP/Codebase/utils/createCodebaseInstance';
import { routeComponentDetails } from '../../../../pages/component-details/route';
import { useDialogContext, useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { SUCCESS_DIALOG_NAME } from '../../../SuccessModal/constants';
import { SuccessDialogForwardedProps } from '../../../SuccessModal/types';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../constants';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../names';
import {
  CreateCodebaseFromTemplateDialogForwardedProps,
  CreateCodebaseFromTemplateFormValues,
} from '../../types';

export const FormActions = () => {
  const { setDialog } = useDialogContext();
  const { closeDialog } = useSpecificDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>(
    CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME
  );

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<CreateCodebaseFromTemplateFormValues>();

  const onSuccess = React.useCallback(
    (codebaseData: CodebaseKubeObjectInterface) => {
      const successModalForwardedProps: SuccessDialogForwardedProps = {
        dialogTitle: `Create Application`,
        title: `Your new Application is created`,
        description: `Browse your new Application and start working with it.`,
        goToLink: {
          routeName: routeComponentDetails.path,
          text: `go to application`,
          routeParams: {
            namespace: codebaseData.metadata.namespace || getDefaultNamespace(),
            name: codebaseData.metadata.name,
          },
        },
      };

      setDialog({
        modalName: SUCCESS_DIALOG_NAME,
        forwardedProps: successModalForwardedProps,
      });

      closeDialog();
      reset();
    },
    [closeDialog, reset, setDialog]
  );

  const {
    createCodebase,
    mutations: { codebaseCreateMutation },
  } = useCodebaseCRUD({
    onSuccess: onSuccess,
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
