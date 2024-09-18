import { Icon } from '@iconify/react';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/groups/default/Secret';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { DeleteKubeObjectDialog } from '../../../dialogs/DeleteKubeObject';
import { useFormsContext } from '../../hooks/useFormsContext';
import { useDataContext } from '../../providers/Data/hooks';

export const Actions = () => {
  const {
    forms,
    resetAll,
    submitAll,
    isAnyFormDirty,
    isAnyFormSubmitting,
    isAnyFormForbiddenToSubmit,
  } = useFormsContext();

  const { secret, ownerReference, permissions } = useDataContext();

  const { setDialog } = useDialogContext();

  const handleDelete = React.useCallback(() => {
    setDialog(DeleteKubeObjectDialog, {
      kubeObject: SecretKubeObject,
      kubeObjectData: secret as EDPKubeObjectInterface,
      objectName: secret?.metadata.name,
      description: `Confirm the deletion of the secret`,
    });
  }, [secret, setDialog]);

  const canDelete = !ownerReference && permissions.delete.Secret.allowed;

  const deleteDisabledTooltip = ownerReference
    ? 'You cannot delete this integration because the secret has owner references.'
    : permissions.delete.Secret.reason;

  const submitDisabledTooltip = isAnyFormForbiddenToSubmit
    ? Object.values(forms).find(({ allowedToSubmit: { isAllowed } }) => !isAllowed)
        ?.allowedToSubmit.reason
    : '';

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <ConditionalWrapper
        condition={!canDelete}
        wrapper={(children) => (
          <Tooltip title={deleteDisabledTooltip}>
            <div>{children}</div>
          </Tooltip>
        )}
      >
        <IconButton onClick={handleDelete} disabled={!canDelete} size="large">
          <Icon icon={ICONS.BUCKET} width="20" />
        </IconButton>
      </ConditionalWrapper>

      <Button
        onClick={resetAll}
        size="small"
        component={'button'}
        disabled={!isAnyFormDirty}
        sx={{ ml: 'auto !important' }}
      >
        undo changes
      </Button>
      <ConditionalWrapper
        condition={isAnyFormForbiddenToSubmit}
        wrapper={(children) => (
          <Tooltip title={submitDisabledTooltip}>
            <div>{children}</div>
          </Tooltip>
        )}
      >
        <Button
          onClick={() => submitAll(true)}
          size={'small'}
          component={'button'}
          variant={'contained'}
          color={'primary'}
          disabled={!isAnyFormDirty || isAnyFormSubmitting || isAnyFormForbiddenToSubmit}
        >
          save
        </Button>
      </ConditionalWrapper>
    </Stack>
  );
};
