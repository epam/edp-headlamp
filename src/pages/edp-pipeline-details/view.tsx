import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { StatusIcon } from '../../components/StatusIcon';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { humanize } from '../../utils/date/humanize';
import { PipelineRunActionsMenu } from '../../widgets/PipelineRunActionsMenu';
import { routeEDPPipelineList } from '../edp-pipelines/route';
import { PipelineRunDetails } from './components/PipelineRunDetails';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { PipelineRouteParams } from './types';

// Complicated navigation logic
// Accordion = TaskRun
// Tab = TaskRun || Step

export const PageView = () => {
  const theme = useTheme();
  const { name } = useParams<PipelineRouteParams>();

  const {
    pipelineRun,
    pipelineRunData: {
      data: { pipelineRunTasks, taskRunListByNameMap },
      isLoading: pipelineRunDataIsLoading,
    },
  } = useDynamicDataContext();

  const status = PipelineRunKubeObject.parseStatus(pipelineRun.data);
  const reason = PipelineRunKubeObject.parseStatusReason(pipelineRun.data);

  const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);

  const statusObject = React.useMemo(() => {
    const condition = pipelineRun.data?.status?.conditions?.[0];
    const lastTransitionTime = condition?.lastTransitionTime;
    const message = condition?.message;

    const timeAgo = humanize(new Date(lastTransitionTime).getTime() - new Date().getTime(), {
      language: 'en-mini',
      spacer: '',
      delimiter: ' ',
      fallbacks: ['en'],
      largest: 2,
      round: true,
      units: ['d', 'h', 'm', 's'],
    });

    return {
      updated: `Last updated: ${timeAgo} ago`,
      message: message,
    };
  }, [pipelineRun.data?.status?.conditions]);

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
    >
      <Section
        title={<Typography fontSize={theme.typography.pxToRem(48)}>{name}</Typography>}
        description={
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <div>
                <StatusIcon
                  icon={icon}
                  color={color}
                  isRotating={isRotating}
                  width={25}
                  Title={`Status: ${status}. Reason: ${reason}`}
                />
              </div>
              <div>
                <Typography>{`${statusObject.updated}.  ${statusObject.message}`}</Typography>
              </div>
            </Stack>
            <div>
              {!pipelineRun.isLoading && (
                <PipelineRunActionsMenu
                  data={{
                    pipelineRun: pipelineRun.data,
                  }}
                  backRoute={Router.createRouteURL(routeEDPPipelineList.path)}
                  variant="inline"
                />
              )}
            </div>
          </Stack>
        }
      >
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
