import { Tab, Tabs as MuiTabs } from '@mui/material';
import React from 'react';
import { LOCAL_STORAGE_SERVICE } from '../../services/local-storage';
import { TabPanel } from '../TabPanel';
import { useStyles } from './styles';
import { TabsProps } from './types';

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const LS_LAST_TAB_KEY = (id: string) => `lastTab::${id}`;

export const Tabs = ({ tabs, initialTabIdx, rememberLastTab, id }: TabsProps) => {
  const classes = useStyles();
  const [activeTabIdx, setActiveTabIdx] = React.useState<string | number>(
    rememberLastTab
      ? LOCAL_STORAGE_SERVICE.getItem(LS_LAST_TAB_KEY(id)) || initialTabIdx
      : initialTabIdx
  );
  const handleChangeTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newActiveTabIdx: string | number) => {
      setActiveTabIdx(newActiveTabIdx);
      LOCAL_STORAGE_SERVICE.setItem(LS_LAST_TAB_KEY(id), newActiveTabIdx);
    },
    [id]
  );

  return (
    <>
      <MuiTabs
        value={activeTabIdx}
        onChange={handleChangeTab}
        indicatorColor={'primary'}
        textColor={'primary'}
        className={classes.tabs}
      >
        {tabs.map(({ label, icon, disabled = false }, idx) => (
          <Tab
            key={`tab::${idx}`}
            label={label}
            disabled={disabled}
            icon={icon}
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
