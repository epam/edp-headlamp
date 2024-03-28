import { Button, Stack } from '@mui/material';
import React from 'react';
import { useGitServerFormsContext } from '../../hooks/useGitServerFormsContext';

export const Actions = () => {
  const { resetAll, submitAll, isAnyFormDirty, isAnyFormSubmitting } = useGitServerFormsContext();

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
      <Button onClick={resetAll} size="small" component={'button'} disabled={!isAnyFormDirty}>
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
