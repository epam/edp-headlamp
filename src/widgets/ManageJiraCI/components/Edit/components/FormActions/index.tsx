import { Button, Grid } from '@mui/material';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useSetupJiraServer } from '../../../../hooks/useSetupJiraCI';
import { ManageJiraCIFormValues } from '../../../../types';

export const FormActions = () => {
  const {
    reset,
    formState: { isDirty },
    handleSubmit,
    getValues,
  } = useReactHookFormContext<ManageJiraCIFormValues>();

  const { setupJiraServer, isLoading } = useSetupJiraServer({
    onSuccess: () => {
      const values = getValues();
      reset(values);
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
