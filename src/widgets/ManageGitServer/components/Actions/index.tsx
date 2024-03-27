import { Button, Stack } from '@mui/material';
import React from 'react';
import { useMultiFormContext } from '../../../../providers/MultiForm/hooks';
import { ActionsProps } from './types';

export const Actions = ({ formRefs }: ActionsProps) => {
  const { resetAll } = useMultiFormContext();

  const handleReset = () => {
    resetAll();
  };

  const handleSubmit = () => {
    formRefs.forEach((formRef) => {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
  };

  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
      <Button onClick={handleReset} size="small" component={'button'}>
        undo changes
      </Button>
      <Button
        onClick={handleSubmit}
        size={'small'}
        component={'button'}
        variant={'contained'}
        color={'primary'}
      >
        save
      </Button>
    </Stack>
  );
};
