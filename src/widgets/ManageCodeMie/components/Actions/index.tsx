import { Button, Stack } from '@mui/material';
import React from 'react';
import { useFormsContext } from '../../hooks/useFormsContext';

export const Actions = () => {
  const { resetAll, submitAll, isAnyFormDirty, isAnyFormSubmitting } = useFormsContext();

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'space-between' }}>
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
