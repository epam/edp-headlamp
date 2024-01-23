import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useEDPComponentCRUD } from '../../../../../../k8s/EDPComponent/hooks/useEDPComponentCRUD';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createSonarQubeIntegrationSecretInstance } from '../../../../../../k8s/Secret/utils/createSonarQubeIntegrationSecretInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import {
  ManageSonarIntegrationSecretFormDataContext,
  ManageSonarIntegrationSecretFormValues,
} from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageSonarIntegrationSecretFormValues>();

  const {
    formData: { handleClosePanel, ownerReference, sonarEDPComponent },
  } = useFormContext<ManageSonarIntegrationSecretFormDataContext>();

  const {
    createSecret,
    mutations: { secretCreateMutation, secretEditMutation, secretDeleteMutation },
  } = useSecretCRUD({
    onSuccess: async () => {
      handleClosePanel();
    },
  });

  const {
    editEDPComponent,
    mutations: { EDPComponentEditMutation },
  } = useEDPComponentCRUD({});

  const isLoading =
    secretCreateMutation.isLoading ||
    secretEditMutation.isLoading ||
    secretDeleteMutation.isLoading ||
    EDPComponentEditMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageSonarIntegrationSecretFormValues) => {
      const newEDPComponentData = editResource(
        {
          url: {
            name: 'url',
            path: ['spec', 'url'],
          },
        },
        sonarEDPComponent,
        {
          url: values.externalUrl,
        }
      );

      await editEDPComponent({
        EDPComponentData: newEDPComponentData,
      });

      if (!!ownerReference) {
        return;
      }

      const secretInstance = createSonarQubeIntegrationSecretInstance(values);

      await createSecret({ secretData: secretInstance });
    },
    [createSecret, editEDPComponent, ownerReference, sonarEDPComponent]
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
                disabled={isLoading || !isDirty}
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
