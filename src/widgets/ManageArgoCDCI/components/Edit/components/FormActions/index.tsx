import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useEDPComponentCRUD } from '../../../../../../k8s/EDPComponent/hooks/useEDPComponentCRUD';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createArgoCDIntegrationSecretInstance } from '../../../../../../k8s/Secret/utils/createArgoCDIntegrationSecretInstance';
import {
  useDialogContext,
  useSpecificDialogContext,
} from '../../../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../../../DeleteKubeObject/types';
import {
  ManageArgoCDIntegrationSecretFormDataContext,
  ManageArgoCDIntegrationSecretFormValues,
} from '../../../../types';

export const FormActions = () => {
  const { setDialog } = useDialogContext();
  const { closeDialog } = useSpecificDialogContext<DeleteKubeObjectDialogForwardedProps>(
    DELETE_KUBE_OBJECT_DIALOG_NAME
  );
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
    getValues,
  } = useReactHookFormContext<ManageArgoCDIntegrationSecretFormValues>();

  const {
    formData: { argoCDSecret, ownerReference, argoCDEDPComponent },
  } = useFormContext<ManageArgoCDIntegrationSecretFormDataContext>();

  const {
    editEDPComponent,
    mutations: { EDPComponentEditMutation },
  } = useEDPComponentCRUD({});

  const {
    editSecret,
    mutations: { secretEditMutation, secretDeleteMutation },
  } = useSecretCRUD({
    onSuccess: async () => {
      closeDialog();
      const values = getValues();
      reset(values);
    },
  });

  const isLoading =
    secretEditMutation.isLoading ||
    secretDeleteMutation.isLoading ||
    EDPComponentEditMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageArgoCDIntegrationSecretFormValues) => {
      const newEDPComponentData = editResource(
        {
          url: {
            name: 'url',
            path: ['spec', 'url'],
          },
        },
        argoCDEDPComponent,
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

      const secretInstance = createArgoCDIntegrationSecretInstance(values);

      await editSecret({ secretData: secretInstance });
    },
    [argoCDEDPComponent, editEDPComponent, editSecret, ownerReference]
  );

  const handleDelete = React.useCallback(async () => {
    setDialog({
      modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
      forwardedProps: {
        kubeObject: SecretKubeObject,
        kubeObjectData: argoCDSecret as EDPKubeObjectInterface,
        objectName: argoCDSecret?.metadata.name,
        description: `Confirm the deletion of the secret`,
      },
    });
  }, [argoCDSecret, setDialog]);

  return (
    <>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item>
          <ConditionalWrapper
            condition={!!ownerReference}
            wrapper={(children) => (
              <Tooltip
                title={
                  'You cannot delete this integration because the secret has owner references.'
                }
              >
                <div>{children}</div>
              </Tooltip>
            )}
          >
            <IconButton onClick={handleDelete} disabled={!!ownerReference} size="large">
              <Icon icon={ICONS.BUCKET} width="20" />
            </IconButton>
          </ConditionalWrapper>
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
                disabled={isLoading || !isDirty || !argoCDEDPComponent}
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
