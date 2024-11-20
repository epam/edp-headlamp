import { Router } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../components/ErrorContent';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { Tabs } from '../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../providers/Tabs/hooks';
import { PipelineRunActionsMenu } from '../../widgets/PipelineRunActionsMenu';
import { routePipelineRunList } from '../pipelines/route';
import { useTabs } from './hooks/useTabs';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { PipelineRouteParams } from './types';

// Complicated navigation logic
// Accordion = TaskRun
// Tab = TaskRun || Step

export const PageView = () => {
  const { name } = useParams<PipelineRouteParams>();

  const permissions = useTypedPermissions();

  const {
    pipelineRun,
    pipelineRunData: { isLoading: pipelineRunDataIsLoading },
  } = useDynamicDataContext();

  const tabs = useTabs();
  const { activeTab, handleChangeTab } = useTabsContext();

  const resourceIsLoaded =
    !pipelineRun.isLoading && !pipelineRunDataIsLoading && !pipelineRun.error;

  const renderPageContent = React.useCallback(() => {
    if (pipelineRun.error) {
      return <ErrorContent error={pipelineRun.error} />;
    }

    return (
      <LoadingWrapper isLoading={pipelineRun.isLoading || pipelineRunDataIsLoading}>
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [
    pipelineRun.error,
    pipelineRun.isLoading,
    pipelineRunDataIsLoading,
    tabs,
    activeTab,
    handleChangeTab,
  ]);

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Pipelines',
          url: {
            pathname: routePipelineRunList.path,
          },
        },
        {
          label: name,
        },
      ]}
      headerSlot={
        <div>
          {resourceIsLoaded && (
            <PipelineRunActionsMenu
              data={{
                pipelineRun: pipelineRun.data,
              }}
              permissions={permissions}
              backRoute={Router.createRouteURL(routePipelineRunList.path)}
              variant="inline"
            />
          )}
        </div>
      }
    >
      <Section title={name}>{renderPageContent()}</Section>
    </PageWrapper>
  );
};
