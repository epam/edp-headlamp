import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { Tabs } from '../../../../components/Tabs';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { routeTaskList } from '../task-list/route';
import { useTabs } from './hooks/useTabs';
import { TaskDetailsRouteParams } from './types';

export const PageView = () => {
  const { namespace, name } = useParams<TaskDetailsRouteParams>();
  const [item, error] = TaskKubeObject.useGet(name, namespace);

  const tabs = useTabs({ task: item });

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
          <Tabs tabs={tabs} initialTabIdx={0} rememberLastTab id="task-details-page" />
        </LoadingWrapper>
      </Section>
    </PageWrapper>
  );
};
