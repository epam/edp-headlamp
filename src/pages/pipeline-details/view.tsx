import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { Tabs } from '../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../providers/Tabs/hooks';
import { PipelineRunActionsMenu } from '../../widgets/PipelineRunActionsMenu';
import { routePipelineRunList } from '../pipelines/route';
import { ReserveLogs } from './components/ReserveLogs';
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
    logs,
  } = useDynamicDataContext();

  const tabs = useTabs();
  const { activeTab, handleChangeTab } = useTabsContext();

  const resourceIsLoaded =
    !pipelineRun.isLoading && !pipelineRunDataIsLoading && !pipelineRun.error;

  const theme = useTheme();

  const renderPageContent = React.useCallback(() => {
    const hasReserveLogs = !logs.isLoading && (!logs.error || !logs.data.all.length);

    if (pipelineRun.error) {
      return (
        <Stack spacing={1}>
          <LoadingWrapper isLoading={logs.isLoading}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <Icon icon={'ph:warning-fill'} color="#A2A7B7" width={48} height={48} />
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography
                  component="span"
                  fontSize={theme.typography.pxToRem(14)}
                  color="#596D80"
                >
                  {hasReserveLogs
                    ? 'No pipeline runs were found for the requested resource. Logs have been retrieved from OpenSearch.'
                    : 'No logs were found for the requested pipeline run. This might have been caused by environment cleanup. Please ensure you have checked the correct resource.'}
                </Typography>
              </Stack>
            </Stack>
            {hasReserveLogs && <ReserveLogs />}
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
    logs.isLoading,
    logs.error,
    logs.data,
    pipelineRun.error,
    pipelineRun.isLoading,
    pipelineRunDataIsLoading,
    tabs,
    activeTab,
    handleChangeTab,
    theme.typography,
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
