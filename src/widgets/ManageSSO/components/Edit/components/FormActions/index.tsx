import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../../../k8s/Secret';
import { useSecretCRUD } from '../../../../../../k8s/Secret/hooks/useSecretCRUD';
import { createSSOIntegrationSecretInstance } from '../../../../../../k8s/Secret/utils/createSSOIntegrationSecretInstance';
import {
  useDialogContext,
  useSpecificDialogContext,
} from '../../../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../../../DeleteKubeObject/types';
import {
  ManageSSOIntegrationSecretFormDataContext,
  ManageSSOIntegrationSecretFormValues,
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
  } = useReactHookFormContext<ManageSSOIntegrationSecretFormValues>();

  const {
    formData: { ssoSecret, isReadOnly },
  } = useFormContext<ManageSSOIntegrationSecretFormDataContext>();

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

  const isLoading = secretEditMutation.isLoading || secretDeleteMutation.isLoading;

  const onSubmit = React.useCallback(
    async (values: ManageSSOIntegrationSecretFormValues) => {
      const secretInstance = createSSOIntegrationSecretInstance(values);

      await editSecret({ secretData: secretInstance });
    },
    [editSecret]
  );

  const handleDelete = React.useCallback(async () => {
    setDialog({
      modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
      forwardedProps: {
        kubeObject: SecretKubeObject,
        kubeObjectData: ssoSecret as EDPKubeObjectInterface,
        objectName: ssoSecret?.metadata.name,
        description: `Confirm the deletion of the secret`,
      },
    });
  }, [ssoSecret, setDialog]);

  return (
    <>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item>
          <ConditionalWrapper
            condition={isReadOnly}
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
            <IconButton onClick={handleDelete} disabled={isReadOnly} size="large">
              <Icon icon={ICONS.BUCKET} width="20" />
            </IconButton>
          </ConditionalWrapper>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <Button
                onClick={() => reset()}
                size="small"
                component={'button'}
                disabled={isReadOnly || !isDirty}
              >
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
                disabled={isReadOnly || isLoading || !isDirty}
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
