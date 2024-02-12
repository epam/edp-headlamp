import { Icon } from '@iconify/react';
import { Tooltip } from '@material-ui/core';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../../../../ConfirmResourcesUpdates/constants';
import { useFormContext } from '../../../../hooks/useFormContext';
import { useSetupJiraServer } from '../../../../hooks/useSetupJiraCI';
import { ManageJiraCIFormValues } from '../../../../types';
import { useResetIntegration } from './hooks/useResetIntegration';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
    getValues,
  } = useReactHookFormContext<ManageJiraCIFormValues>();

  const { setupJiraServer, isLoading: isSetupLoading } = useSetupJiraServer({
    onSuccess: () => {
      const values = getValues();
      reset(values);
    },
  });

  const {
    formData: { ownerReference },
  } = useFormContext();

  const onSubmit = React.useCallback(
    async (values: ManageJiraCIFormValues) => {
      await setupJiraServer(values);
    },
    [setupJiraServer]
  );

  const { resetJiraIntegration, isLoading: isResetLoading } = useResetIntegration({
    onSuccess: () => {
      reset();
    },
  });

  const isLoading = isSetupLoading || isResetLoading;

  const { setDialog } = useDialogContext();

  return (
    <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
      <Grid item style={{ marginRight: 'auto' }}>
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
            color="primary"
            style={{ pointerEvents: 'auto' }}
            onClick={() => {
              setDialog({
                modalName: CONFIRM_RESOURCES_UPDATES_DIALOG_NAME,
                forwardedProps: {
                  deleteCallback: resetJiraIntegration,
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
      </Grid>
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
          disabled={!isDirty || isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          save
        </Button>
      </Grid>
    </Grid>
  );
};
