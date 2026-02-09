import React from 'react';
import { TabsContext } from './context';
import { TabsContextProviderValue } from './types';

export const useTabsContext = () => React.useContext<TabsContextProviderValue>(TabsContext);
