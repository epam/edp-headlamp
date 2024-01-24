import { Icon } from '@iconify/react';
import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { useStyles } from './styles';
import { StatusIconProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const StatusIcon = ({
  Title,
  icon,
  color,
  isRotating = false,
  width = 25,
}: StatusIconProps) => {
  const classes = useStyles();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={stopPropagation}>
      <ConditionalWrapper
        condition={!!Title}
        wrapper={(children) => <Tooltip title={Title}>{children}</Tooltip>}
      >
        <Icon
          icon={icon}
          color={color}
          width={width}
          className={clsx(classes.icon, {
            [classes.rotateIcon]: isRotating,
          })}
        />
      </ConditionalWrapper>
    </div>
  );
};
