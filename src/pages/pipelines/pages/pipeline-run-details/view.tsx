import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { PageWrapper } from '../../../../components/PageWrapper';
import { ResourceIconLink } from '../../../../components/ResourceIconLink';
import { Section } from '../../../../components/Section';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { getPullRequestURL } from '../../../../k8s/groups/Tekton/PipelineRun/utils/getPullRequestURL';
import { Tabs } from '../../../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../../../providers/Tabs/hooks';
import { PipelineRunActionsMenu } from '../../../../widgets/PipelineRunActionsMenu';
import { routePipelineRunList } from '../pipeline-run-list/route';
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
    return (
      <LoadingWrapper isLoading={pipelineRun.isLoading || pipelineRunDataIsLoading}>
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [pipelineRun.isLoading, pipelineRunDataIsLoading, tabs, activeTab, handleChangeTab]);

  const pullRequestLink = getPullRequestURL(pipelineRun.data);

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
        <Stack direction="row" spacing={2} alignItems="center">
          {pullRequestLink && (
            <div>
              <ResourceIconLink
                tooltipTitle={'Go to the Pull Request page'}
                link={pullRequestLink}
                icon={ICONS.NEW_WINDOW}
                name="pull request"
                isTextButton
                variant="outlined"
                size="small"
              />
            </div>
          )}
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
        </Stack>
      }
    >
      <Section title={name} enableCopyTitle>
        {renderPageContent()}
      </Section>
    </PageWrapper>
  );
};
