import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { editResource } from '../../../../k8s/common/editResource';
import { useQuickLinkCRUD } from '../../../../k8s/QuickLink/hooks/useQuickLinkCRUD';
import { useFormContext } from '../../../../providers/Form/hooks';
import { QUICK_LINK_FORM_NAMES } from '../../names';
import { ManageQuickLinkDataContext, ManageQuickLinkValues } from '../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageQuickLinkValues>();

  const {
    formData: { QuickLink },
  } = useFormContext<ManageQuickLinkDataContext>();

  const handleClose = React.useCallback(() => {
    reset();
  }, [reset]);

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
    [editQuickLink, QuickLink]
  );

  return (
    <Grid container spacing={2} justifyContent={'flex-end'}>
      <Grid item>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item>
            <Button
              onClick={handleResetFields}
              size="small"
              component={'button'}
              disabled={!isDirty}
            >
              undo changes
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'contained'}
              color={'primary'}
              size="small"
              disabled={!isDirty || isLoading}
            >
              apply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
