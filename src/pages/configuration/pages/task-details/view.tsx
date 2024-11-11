import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { Tabs } from '../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../providers/Tabs/hooks';
import { routeTaskList } from '../task-list/route';
import { useTabs } from './hooks/useTabs';
import { TaskDetailsRouteParams } from './types';

export const PageView = () => {
  const { namespace, name } = useParams<TaskDetailsRouteParams>();
  const [item, error] = TaskKubeObject.useGet(name, namespace);

  const tabs = useTabs({ task: item });
  const { activeTab, handleChangeTab } = useTabsContext();

  return (
    <PageWrapper
      containerMaxWidth={'xl'}
      breadcrumbs={[
        {
          label: 'Tasks',
          url: {
            pathname: routeTaskList.path,
          },
        },
        {
          label: name,
        },
      ]}
    >
      <Section title={name}>
        <LoadingWrapper isLoading={item === null && !error}>
          <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
        </LoadingWrapper>
      </Section>
    </PageWrapper>
  );
};
