import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useFormContext } from '../../../../hooks/useFormContext';
import { useSetupJiraServer } from '../../../../hooks/useSetupJiraCI';
import { ManageJiraCIFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageJiraCIFormValues>();
  const {
    formData: { handleClosePanel },
  } = useFormContext();

  const { setupJiraServer, isLoading } = useSetupJiraServer({
    onSuccess: () => {
      reset();
      handleClosePanel();
    },
  });

  const onSubmit = React.useCallback(
    async (values: ManageJiraCIFormValues) => {
      await setupJiraServer(values);
    },
    [setupJiraServer]
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
