import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../../../components/ErrorContent';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWrapper } from '../../../../components/PageWrapper';
import { Section } from '../../../../components/Section';
import { TaskKubeObject } from '../../../../k8s/groups/Tekton/Task';
import { Tabs } from '../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../providers/Tabs/hooks';
import { TaskActionsMenu } from '../../../../widgets/TaskActionsMenu';
import { routeTaskList } from '../task-list/route';
import { useTabs } from './hooks/useTabs';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { TaskDetailsRouteParams } from './types';

export const PageView = () => {
  const { namespace, name } = useParams<TaskDetailsRouteParams>();
  const [item, error] = TaskKubeObject.useGet(name, namespace);

  const tabs = useTabs({ task: item });
  const { activeTab, handleChangeTab } = useTabsContext();

  const permissions = useTypedPermissions();

  const renderPageContent = React.useCallback(() => {
    if (error) {
      return <ErrorContent error={error} />;
    }

    return (
      <LoadingWrapper isLoading={item === null}>
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [activeTab, error, handleChangeTab, item, tabs]);

  const resourceIsLoaded = item !== null && !error;

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
      headerSlot={
        resourceIsLoaded ? (
          <TaskActionsMenu
            data={{
              task: item?.jsonData ?? item,
            }}
            permissions={permissions}
            variant="inline"
          />
        ) : undefined
      }
    >
      <Section title={name} enableCopyTitle>
        {renderPageContent()}
      </Section>
    </PageWrapper>
  );
};
