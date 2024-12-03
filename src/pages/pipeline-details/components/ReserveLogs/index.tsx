import React from 'react';
import { Tabs } from '../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../providers/Tabs/hooks';
import { useTabs } from './hooks/useTabs';

export const ReserveLogs = () => {
  const tabs = useTabs();
  const { handleChangeTab, activeTab } = useTabsContext();

  return <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />;
};
