import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { useSecretCRUD } from '../../../../../../k8s/groups/default/Secret/hooks/useSecretCRUD';
import { createClusterSecretInstance } from '../../../../../../k8s/groups/default/Secret/utils/createClusterSecretInstance';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { DeleteKubeObjectDialog } from '../../../../../dialogs/DeleteKubeObject';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../../../types';
import { ClusterCDPipelineConflictError } from './components/ClusterCDPipelineConflictError';
import { useConflictedStage } from './hooks/useConflictedStage';

export const FormActions = () => {
  const { setDialog } = useDialogContext();
  const {
    formData: { currentElement, permissions },
  } = useFormContext<ManageClusterSecretDataContext>();

  const {
    reset,
    formState: { isDirty },
    handleSubmit,
    getValues,
  } = useReactHookFormContext<ManageClusterSecretValues>();

  const {
    editSecret,
    mutations: { secretEditMutation },
  } = useSecretCRUD({
    onSuccess: () => {
      const values = getValues();
      reset(values);
    },
  });

  const isLoading = React.useMemo(() => secretEditMutation.isLoading, [secretEditMutation]);

  const onSubmit = React.useCallback(
    async (values: ManageClusterSecretValues) => {
      if (!permissions?.update?.Secret.allowed) {
        return false;
      }

      const { clusterName, clusterHost, clusterToken, clusterCertificate, skipTLSVerify } = values;

      const newClusterSecretData = createClusterSecretInstance({
        clusterName,
        clusterHost,
        clusterToken,
        clusterCertificate,
        skipTLSVerify,
      });

      await editSecret({
        secretData: newClusterSecretData,
      });
    },
    [editSecret, permissions?.update?.Secret.allowed]
  );

  const clusterName = currentElement.metadata.name;

  const conflictedStage = useConflictedStage(clusterName);

  const onBeforeSubmit = React.useCallback(
    async (setErrorTemplate, setLoadingActive) => {
      setLoadingActive(true);
      if (!conflictedStage) {
        setLoadingActive(false);
        return;
      }

      setErrorTemplate(
        <ClusterCDPipelineConflictError
          conflictedStage={conflictedStage}
          clusterName={clusterName}
        />
      );
      setLoadingActive(false);
    },
    [clusterName, conflictedStage]
  );

  const handleClickDelete = React.useCallback(() => {
    setDialog(DeleteKubeObjectDialog, {
      objectName: clusterName,
      kubeObject: SecretKubeObject,
      kubeObjectData: currentElement,
      description: `Confirm the deletion of the cluster`,
      onBeforeSubmit,
    });
  }, [clusterName, currentElement, onBeforeSubmit, setDialog]);

  return (
    <>
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item>
          <IconButton onClick={handleClickDelete} size="large">
            <Icon icon={ICONS.BUCKET} width="20" />
          </IconButton>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <Button onClick={() => reset()} size="small" component={'button'} disabled={!isDirty}>
                undo changes
              </Button>
            </Grid>
            <Grid item>
              <ConditionalWrapper
                condition={!permissions?.update?.Secret.allowed}
                wrapper={(children) => (
                  <Tooltip title={permissions?.update?.Secret.reason}>
                    <div>{children}</div>
                  </Tooltip>
                )}
              >
                <Button
                  type={'button'}
                  size={'small'}
                  component={'button'}
                  variant={'contained'}
                  color={'primary'}
                  disabled={isLoading || !isDirty || !permissions?.update?.Secret.allowed}
                  onClick={handleSubmit(onSubmit)}
                >
                  save
                </Button>
              </ConditionalWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
