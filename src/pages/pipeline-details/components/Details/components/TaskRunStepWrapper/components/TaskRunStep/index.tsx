import React from 'react';
import { Tabs } from '../../../../../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../../../../../providers/Tabs/hooks';

export const TaskRunStep = ({
  tabs,
}: {
  tabs: { label: string; component: React.ReactNode; disabled?: boolean }[];
}) => {
  const { activeTab, handleChangeTab } = useTabsContext();

  return <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />;
};
