import { Button, ButtonProps, Tooltip } from '@mui/material';
import React from 'react';
import { ConditionalWrapper } from '../ConditionalWrapper';

export const ButtonWithPermission = ({
  allowed,
  text = 'Forbidden',
  ButtonProps,
  children,
}: {
  allowed: boolean;
  text: string;
  ButtonProps: ButtonProps;
  children: React.ReactNode;
}) => {
  return (
    <ConditionalWrapper
      condition={!allowed}
      wrapper={(children) => <Tooltip title={text}>{children}</Tooltip>}
    >
      <div>
        <Button {...ButtonProps} disabled={ButtonProps?.disabled || !allowed}>
          {children}
        </Button>
      </div>
    </ConditionalWrapper>
  );
};
