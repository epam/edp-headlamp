import { Router } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { PipelineRunActionsMenu } from '../../widgets/PipelineRunActionsMenu';
import { routeEDPPipelineList } from '../edp-pipelines/route';
import { PipelineRunDetails } from './components/PipelineRunDetails';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { usePermissionsContext } from './providers/Permissions/hooks';
import { PipelineRouteParams } from './types';

// Complicated navigation logic
// Accordion = TaskRun
// Tab = TaskRun || Step

export const PageView = () => {
  const { name } = useParams<PipelineRouteParams>();

  const { pipelineRun: pipelineRunPermissions } = usePermissionsContext();

  const {
    pipelineRun,
    pipelineRunData: {
      data: { pipelineRunTasks, taskRunListByNameMap },
      isLoading: pipelineRunDataIsLoading,
    },
  } = useDynamicDataContext();

  return (
    <PageWrapper
      breadcrumbs={[
        {
          label: 'Pipelines',
          url: {
            pathname: routeEDPPipelineList.path,
          },
        },
        {
          label: name,
        },
      ]}
      headerSlot={
        <div>
          {!pipelineRun.isLoading && (
            <PipelineRunActionsMenu
              data={{
                pipelineRun: pipelineRun.data,
              }}
              permissions={pipelineRunPermissions}
              backRoute={Router.createRouteURL(routeEDPPipelineList.path)}
              variant="inline"
            />
          )}
        </div>
      }
    >
      <Section title={name}>
        <LoadingWrapper isLoading={pipelineRunDataIsLoading}>
          <PipelineRunDetails
            pipelineRunTasks={pipelineRunTasks}
            taskRunListByNameMap={taskRunListByNameMap}
          />
        </LoadingWrapper>
      </Section>
    </PageWrapper>
  );
};
