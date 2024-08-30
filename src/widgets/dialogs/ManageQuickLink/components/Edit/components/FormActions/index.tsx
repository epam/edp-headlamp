import { Box, Button, Stack, useTheme } from '@mui/material';
import React from 'react';
import { editResource } from '../../../../../../../k8s/common/editResource';
import { useQuickLinkCRUD } from '../../../../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinkCRUD';
import { useTypedFormContext } from '../../../../hooks/useFormContext';
import { QUICK_LINK_FORM_NAMES } from '../../../../names';
import { useCurrentDialog } from '../../../../providers/CurrentDialog/hooks';
import { ManageQuickLinkFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    props: { quickLink },
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
    editQuickLink,
    mutations: { QuickLinkEditMutation },
  } = useQuickLinkCRUD({
    onSuccess: handleClose,
  });

  const isLoading = QuickLinkEditMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageQuickLinkFormValues) => {
      const editedQuickLink = editResource(QUICK_LINK_FORM_NAMES, quickLink, {
        ...values,
        visible: JSON.parse(values.visible),
      });

      await editQuickLink({
        QuickLinkData: editedQuickLink,
      });
    },
    [editQuickLink, quickLink]
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
