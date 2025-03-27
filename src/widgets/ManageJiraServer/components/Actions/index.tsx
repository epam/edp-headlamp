import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { ConfirmResourcesUpdatesDialog } from '../../../dialogs/ConfirmResourcesUpdates';
import { useFormsContext } from '../../hooks/useFormsContext';
import { useResetIntegration } from '../../hooks/useResetIntegration';
import { useDataContext } from '../../providers/Data/hooks';

export const Actions = ({
  handleCloseCreateDialog,
}: {
  handleCloseCreateDialog: (() => void) | undefined;
}) => {
  const {
    forms,
    resetAll,
    submitAll,
    isAnyFormDirty,
    isAnyFormSubmitting,
    isAnyFormForbiddenToSubmit,
  } = useFormsContext();

  const { jiraServer, secret, ownerReference, permissions } = useDataContext();

  const { resetJiraIntegration, isLoading: isResetting } = useResetIntegration();
  const { setDialog } = useDialogContext();

  const submitDisabledTooltip = isAnyFormForbiddenToSubmit
    ? Object.values(forms).find(({ allowedToSubmit: { isAllowed } }) => !isAllowed)?.allowedToSubmit
        .reason
    : '';

  const canReset = !ownerReference && permissions?.delete?.Secret.allowed;

  const deleteDisabledTooltip = ownerReference
    ? 'Jira Secret has external owners. Please, delete it by your own.'
    : permissions?.delete?.Secret.reason;

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ mr: 'auto' }}>
        {(jiraServer || secret) && (
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
                    resetJiraIntegration({ jiraServer, jiraServerSecret: secret });
                  },
                  text: 'Are you sure you want to reset the integration?',
                  resourcesArray: [],
                });
              }}
              startIcon={<Icon icon={ICONS.WARNING} />}
              disabled={!!ownerReference}
            >
              Reset integration
            </Button>
          </ConditionalWrapper>
        )}
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
              handleCloseCreateDialog && handleCloseCreateDialog();
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
