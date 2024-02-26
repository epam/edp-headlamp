import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useQuickLinkCRUD } from '../../../../../../k8s/QuickLink/hooks/useQuickLinkCRUD';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createDefectDojoIntegrationSecretInstance } from '../../../../../../k8s/Secret/utils/createDefectDojoIntegrationSecretInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import {
  ManageDefectDojoIntegrationSecretFormDataContext,
  ManageDefectDojoIntegrationSecretFormValues,
} from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageDefectDojoIntegrationSecretFormValues>();

  const {
    formData: { handleClosePanel, defectDojoQuickLink, ownerReference },
  } = useFormContext<ManageDefectDojoIntegrationSecretFormDataContext>();

  const {
    editQuickLink,
    mutations: { QuickLinkEditMutation },
  } = useQuickLinkCRUD({});

  const {
    createSecret,
    mutations: { secretCreateMutation, secretEditMutation, secretDeleteMutation },
  } = useSecretCRUD({
    onSuccess: async () => {
      handleClosePanel();
    },
  });

  const isLoading =
    secretCreateMutation.isLoading ||
    secretEditMutation.isLoading ||
    secretDeleteMutation.isLoading ||
    QuickLinkEditMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageDefectDojoIntegrationSecretFormValues) => {
      const newQuickLinkData = editResource(
        {
          url: {
            name: 'url',
            path: ['spec', 'url'],
          },
        },
        defectDojoQuickLink,
        {
          url: values.externalUrl,
        }
      );

      await editQuickLink({
        QuickLinkData: newQuickLinkData,
      });

      if (!!ownerReference) {
        return;
      }

      const secretInstance = createDefectDojoIntegrationSecretInstance(values);

      await createSecret({ secretData: secretInstance });
    },
    [createSecret, defectDojoQuickLink, editQuickLink, ownerReference]
  );

  return (
    <>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item>
          <Button onClick={handleClosePanel} size="small" component={'button'}>
            cancel
          </Button>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <Button onClick={() => reset()} size="small" component={'button'} disabled={!isDirty}>
                undo changes
              </Button>
            </Grid>
            <Grid item>
              <Button
                type={'button'}
                size={'small'}
                component={'button'}
                variant={'contained'}
                color={'primary'}
                disabled={isLoading || !isDirty || !defectDojoQuickLink}
                onClick={handleSubmit(onSubmit)}
              >
                save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
