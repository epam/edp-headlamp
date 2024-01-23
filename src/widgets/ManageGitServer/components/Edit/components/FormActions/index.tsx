import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useSetupGitServer } from '../../../../hooks/useSetupGitServer';
import { ManageGitServerValues } from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
    getValues,
  } = useReactHookFormContext<ManageGitServerValues>();

  const { setupGitServer, isLoading } = useSetupGitServer({
    onSuccess: () => {
      const values = getValues();
      reset(values);
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
      <Grid container spacing={2} justifyContent={'flex-end'}>
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
    </>
  );
};
