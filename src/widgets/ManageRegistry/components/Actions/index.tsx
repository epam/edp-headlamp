import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CONTAINER_REGISTRY_TYPE } from '../../../../k8s/groups/default/ConfigMap/constants';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ConfirmResourcesUpdatesDialog } from '../../../dialogs/ConfirmResourcesUpdates';
import { useRegistryFormsContext } from '../../hooks/useRegistryFormsContext';
import { useResetRegistry } from '../../hooks/useResetRegistry';
import { useDataContext } from '../../providers/Data/hooks';

export const Actions = ({ handleCloseCreateDialog }) => {
  const {
    forms,
    resetAll,
    submitAll,
    isAnyFormDirty,
    isAnyFormSubmitting,
    isAnyFormForbiddenToSubmit,
  } = useRegistryFormsContext();

  const { EDPConfigMap, pushAccountSecret, pullAccountSecret, tektonServiceAccount, permissions } =
    useDataContext();

  const { resetRegistry, isLoading: isResetting } = useResetRegistry({
    EDPConfigMap,
    pushAccountSecret,
    pullAccountSecret,
    tektonServiceAccount,
    onSuccess: () => {
      resetAll();
    },
  });

  const registryType = EDPConfigMap?.data.container_registry_type;

  const someOfTheSecretsHasExternalOwner = React.useMemo(() => {
    switch (registryType) {
      case CONTAINER_REGISTRY_TYPE.ECR:
        return !!pushAccountSecret?.metadata?.ownerReferences;
      default:
        return (
          !!pushAccountSecret?.metadata?.ownerReferences ||
          !!pullAccountSecret?.metadata?.ownerReferences
        );
    }
  }, [
    registryType,
    pushAccountSecret?.metadata?.ownerReferences,
    pullAccountSecret?.metadata?.ownerReferences,
  ]);

  const { setDialog } = useDialogContext();

  const submitDisabledTooltip = isAnyFormForbiddenToSubmit
    ? Object.values(forms).find(({ allowedToSubmit: { isAllowed } }) => !isAllowed)?.allowedToSubmit
        .reason
    : '';

  const canReset = !someOfTheSecretsHasExternalOwner && permissions?.delete?.Secret.allowed;

  const deleteDisabledTooltip = someOfTheSecretsHasExternalOwner
    ? 'Some of the secrets has external owners. Please, delete it by your own.'
    : permissions?.delete?.Secret.reason;

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ mr: 'auto' }}>
        <ConditionalWrapper
          condition={!canReset}
          wrapper={(children) => {
            return <Tooltip title={deleteDisabledTooltip}>{children}</Tooltip>;
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{ pointerEvents: 'auto' }}
            onClick={() => {
              setDialog(ConfirmResourcesUpdatesDialog, {
                deleteCallback: () => {
                  resetRegistry();
                },
                text: 'Are you sure you want to reset the registry?',
                resourcesArray: [],
              });
            }}
            startIcon={<Icon icon={ICONS.WARNING} />}
            disabled={!registryType || someOfTheSecretsHasExternalOwner}
          >
            Reset registry
          </Button>
        </ConditionalWrapper>
      </Box>
      <Stack direction="row" spacing={2}>
        <Button onClick={resetAll} size="small" component={'button'} disabled={!isAnyFormDirty}>
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
            onClick={() => {
              submitAll(true);
              handleCloseCreateDialog();
            }}
            size={'small'}
            component={'button'}
            variant={'contained'}
            color={'primary'}
            disabled={
              !isAnyFormDirty || isAnyFormSubmitting || isResetting || isAnyFormForbiddenToSubmit
            }
          >
            save
          </Button>
        </ConditionalWrapper>
      </Stack>
    </Stack>
  );
};
