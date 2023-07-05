import React from 'react';
import { TabPanelProps } from './types';

export const TabPanel = ({ children, value, index, className, ...other }: TabPanelProps) => {
    const isActive = value === index;
    return (
        <div
            role="tabpanel"
            hidden={!isActive}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            className={className}
            {...other}
        >
            {children}
        </div>
    );
};
