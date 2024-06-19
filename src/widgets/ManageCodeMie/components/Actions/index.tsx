import { Icon } from '@iconify/react';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { useFormsContext } from '../../hooks/useFormsContext';
import { useDataContext } from '../../providers/Data/hooks';

export const Actions = () => {
  const { resetAll, submitAll, isAnyFormDirty, isAnyFormSubmitting } = useFormsContext();

  const { secret, ownerReference } = useDataContext();

  const { setDialog } = useDialogContext();

  const handleDelete = React.useCallback(async () => {
    setDialog({
      modalName: DELETE_KUBE_OBJECT_DIALOG_NAME,
      forwardedProps: {
        kubeObject: SecretKubeObject,
        kubeObjectData: secret as EDPKubeObjectInterface,
        objectName: secret?.metadata.name,
        description: `Confirm the deletion of the secret`,
      },
    });
  }, [secret, setDialog]);

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <ConditionalWrapper
        condition={!!ownerReference}
        wrapper={(children) => (
          <Tooltip
            title={'You cannot delete this integration because the secret has owner references.'}
          >
            <div>{children}</div>
          </Tooltip>
        )}
      >
        <IconButton onClick={handleDelete} disabled={!!ownerReference} size="large">
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
      <Button
        onClick={() => submitAll(true)}
        size={'small'}
        component={'button'}
        variant={'contained'}
        color={'primary'}
        disabled={!isAnyFormDirty || isAnyFormSubmitting}
      >
        save
      </Button>
    </Stack>
  );
};
