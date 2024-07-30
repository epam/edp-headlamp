import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useQuickLinkCRUD } from '../../../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinkCRUD';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../../constants';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { ManageQuickLinkDialogForwardedProps, ManageQuickLinkValues } from '../../../../types';

export const FormActions = () => {
  const {
    forwardedProps: { QuickLink },
    closeDialog,
  } = useSpecificDialogContext<ManageQuickLinkDialogForwardedProps>(MANAGE_QUICK_LINK_DIALOG_NAME);

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useFormContext<ManageQuickLinkValues>();

  const handleClose = React.useCallback(() => {
    closeDialog();
    reset();
  }, [closeDialog, reset]);

  const handleResetFields = React.useCallback(() => {
    reset();
  }, [reset]);

  const {
    editQuickLink,
    mutations: { QuickLinkEditMutation },
  } = useQuickLinkCRUD({
    onSuccess: handleClose,
  });

  const isLoading = QuickLinkEditMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageQuickLinkValues) => {
      const editedQuickLink = editResource(QUICK_LINK_FORM_NAMES, QuickLink, {
        ...values,
        visible: JSON.parse(values.visible),
      });

      await editQuickLink({
        QuickLinkData: editedQuickLink,
      });
    },
    [QuickLink, editQuickLink]
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
