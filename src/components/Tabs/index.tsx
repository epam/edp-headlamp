import { Tab, Tabs as MuiTabs } from '@material-ui/core';
import React from 'react';
import { TabPanel } from '../TabPanel';
import { useStyles } from './styles';

const a11yProps = (index: any) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};
export const Tabs = ({ tabs, initialTabIdx }) => {
    const classes = useStyles();
    const [activeTabIdx, setActiveTabIdx] = React.useState<string | number>(initialTabIdx);
    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent<{}>, newActiveTabIdx: string | number) => {
            setActiveTabIdx(newActiveTabIdx);
        },
        []
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
                {tabs.map(({ label, disabled = false }, idx) => (
                    <Tab
                        key={`tab::${idx}`}
                        label={label}
                        disabled={disabled}
                        {...a11yProps(idx)}
                    />
                ))}
            </MuiTabs>
            {tabs.map(({ component }, idx) => (
                <TabPanel
                    key={`tab::${idx}`}
                    value={activeTabIdx}
                    index={idx}
                    className={classes.tabPanel}
                >
                    {component}
                </TabPanel>
            ))}
        </>
    );
};
