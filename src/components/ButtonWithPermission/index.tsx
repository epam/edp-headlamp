import { Button, ButtonProps, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../ConditionalWrapper';

export const ButtonWithPermission = ({
  disabled,
  reason = 'Forbidden',
  ButtonProps,
  children,
}: {
  disabled: boolean;
  reason: string;
  ButtonProps: ButtonProps;
  children: React.ReactNode;
}) => {
  return (
    <ConditionalWrapper
      condition={disabled}
      wrapper={(children) => <Tooltip title={reason}>{children}</Tooltip>}
    >
      <div>
        <Button {...ButtonProps} disabled={ButtonProps?.disabled || disabled}>
          {children}
        </Button>
      </div>
    </ConditionalWrapper>
  );
};
