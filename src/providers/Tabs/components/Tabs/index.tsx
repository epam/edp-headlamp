import { Tab, Tabs as MuiTabs } from '@mui/material';
import React from 'react';
import { TabPanel } from '../../../../components/TabPanel';
import { useStyles } from './styles';
import { TabsProps } from './types';

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const Tabs = ({ tabs, activeTabIdx, handleChangeTab }: TabsProps) => {
  const classes = useStyles();

  return (
    <>
      <MuiTabs
        value={activeTabIdx}
        onChange={handleChangeTab}
        indicatorColor={'primary'}
        textColor={'primary'}
        className={classes.tabs}
      >
        {tabs.map(({ label, icon, disabled = false, highlightNew, onClick }, idx) => (
          <Tab
            key={`tab::${idx}`}
            label={
              highlightNew ? <span className={classes.tabWithHighlightDot}>{label}</span> : label
            }
            disabled={disabled}
            icon={icon}
            onClick={onClick}
            {...a11yProps(idx)}
          />
        ))}
      </MuiTabs>
      {tabs.map(({ component }, idx) => (
        <TabPanel key={`tab::${idx}`} value={activeTabIdx} index={idx}>
          {component}
        </TabPanel>
      ))}
    </>
  );
};
