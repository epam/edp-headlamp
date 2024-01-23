import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { useSetupGitServer } from '../../../../hooks/useSetupGitServer';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useReactHookFormContext<ManageGitServerValues>();
  const {
    formData: { handleClosePanel },
  } = useFormContext<ManageGitServerDataContext>();

  const { setupGitServer, isLoading } = useSetupGitServer({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = React.useCallback(
    async (values: ManageGitServerValues) => {
      await setupGitServer(values);
    },
    [setupGitServer]
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
