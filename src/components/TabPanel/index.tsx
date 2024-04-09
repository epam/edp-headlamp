import React from 'react';
import { useStyles } from './styles';
import { TabPanelProps } from './types';

export const TabPanel = ({
  children,
  value,
  index,
  shouldRender = true,
  ...other
}: TabPanelProps) => {
  const classes = useStyles();

  const isActive = value === index;
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {shouldRender && isActive ? children : null}
    </div>
  );
};
