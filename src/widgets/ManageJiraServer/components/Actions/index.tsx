import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../../ConfirmResourcesUpdates/constants';
import { useFormsContext } from '../../hooks/useFormsContext';
import { useResetIntegration } from '../../hooks/useResetIntegration';
import { useDataContext } from '../../providers/Data/hooks';

export const Actions = ({ handleCloseCreateDialog }) => {
  const { resetAll, submitAll, isAnyFormDirty, isAnyFormSubmitting } = useFormsContext();

  const { jiraServer, secret, ownerReference } = useDataContext();

  const { resetJiraIntegration, isLoading: isResetting } = useResetIntegration();
  const { setDialog } = useDialogContext();

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ mr: 'auto' }}>
        {(jiraServer || secret) && (
          <ConditionalWrapper
            condition={!!ownerReference}
            wrapper={(children) => {
              return (
                <Tooltip title={'Jira Secret has external owners. Please, delete it by your own.'}>
                  {children}
                </Tooltip>
              );
            }}
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
              style={{ pointerEvents: 'auto' }}
              onClick={() => {
                setDialog({
                  modalName: CONFIRM_RESOURCES_UPDATES_DIALOG_NAME,
                  forwardedProps: {
                    deleteCallback: () => {
                      resetJiraIntegration({ jiraServer, jiraServerSecret: secret });
                    },
                    text: 'Are you sure you want to reset the integration?',
                  },
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
        <Button
          onClick={() => {
            submitAll(true);
            handleCloseCreateDialog();
          }}
          size={'small'}
          component={'button'}
          variant={'contained'}
          color={'primary'}
          disabled={!isAnyFormDirty || isAnyFormSubmitting || isResetting}
        >
          save
        </Button>
      </Stack>
    </Stack>
  );
};
