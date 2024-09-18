import { Button, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../../../../components/ConditionalWrapper';
import { useFormsContext } from '../../hooks/useFormsContext';

export const Actions = () => {
  const {
    forms,
    resetAll,
    submitAll,
    isAnyFormDirty,
    isAnyFormSubmitting,
    isAnyFormForbiddenToSubmit,
  } = useFormsContext();

  const submitDisabledTooltip = isAnyFormForbiddenToSubmit
    ? Object.values(forms).find(({ allowedToSubmit: { isAllowed } }) => !isAllowed)?.allowedToSubmit
        .reason
    : '';

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'flex-end' }}>
      <Button
        onClick={resetAll}
        size="small"
        component={'button'}
        disabled={!isAnyFormDirty}
        sx={{ ml: 'auto !important' }}
      >
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
          onClick={() => submitAll(true)}
          size={'small'}
          component={'button'}
          variant={'contained'}
          color={'primary'}
          disabled={!isAnyFormDirty || isAnyFormSubmitting || isAnyFormForbiddenToSubmit}
        >
          save
        </Button>
      </ConditionalWrapper>
    </Stack>
  );
};
