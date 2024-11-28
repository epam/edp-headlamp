import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../components/ErrorContent';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { LogViewer } from '../../components/LogViewer';
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
    fallbackLogs,
  } = useDynamicDataContext();

  const tabs = useTabs();
  const { activeTab, handleChangeTab } = useTabsContext();

  const resourceIsLoaded =
    !pipelineRun.isLoading && !pipelineRunDataIsLoading && !pipelineRun.error;

  const renderPageContent = React.useCallback(() => {
    if (pipelineRun.error) {
      return (
        <Stack spacing={1}>
          <ErrorContent error={pipelineRun.error} />
          <LoadingWrapper isLoading={fallbackLogs.isLoading}>
            <Stack spacing={2}>
              <LogViewer
                downloadName={`fallback-logs-${name}.log`}
                logs={(fallbackLogs.data?.hits?.hits || []).map((el) => `${el._source.log}\n`)}
                topActions={[<Typography variant="h6">Reserve Logs</Typography>]}
              />
            </Stack>
          </LoadingWrapper>
        </Stack>
      );
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
    fallbackLogs.isLoading,
    fallbackLogs.data?.hits?.hits,
    name,
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
