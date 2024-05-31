import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { StatusIcon } from '../../components/StatusIcon';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../k8s/PipelineRun';
import { humanize } from '../../utils/date/humanize';
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
  const theme = useTheme();
  const { name } = useParams<PipelineRouteParams>();

  const { pipelineRun: pipelineRunPermissions } = usePermissionsContext();

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
    const completionTime = pipelineRun.data?.status?.completionTime;
    const startedAt = pipelineRun.data?.status?.startTime;
    const message = condition?.message;

    const updatedLast = humanize(new Date(lastTransitionTime).getTime() - new Date().getTime(), {
      language: 'en-mini',
      spacer: '',
      delimiter: ' ',
      fallbacks: ['en'],
      largest: 2,
      round: true,
      units: ['d', 'h', 'm', 's'],
    });

    const activeDuration = humanize(
      completionTime
        ? new Date(completionTime).getTime() - new Date(startedAt).getTime()
        : new Date().getTime() - new Date(startedAt).getTime(),
      {
        language: 'en-mini',
        spacer: '',
        delimiter: ' ',
        fallbacks: ['en'],
        largest: 2,
        round: true,
        units: ['d', 'h', 'm', 's'],
      }
    );

    return {
      startedAt: new Date(pipelineRun.data?.status?.startTime).toLocaleString('en-mini', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      activeDuration,
      updatedLast,
      message: message,
    };
  }, [pipelineRun]);

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
        title={
          <Stack direction="row" spacing={2} alignItems="center">
            <StatusIcon
              icon={icon}
              color={color}
              isRotating={isRotating}
              width={30}
              Title={`Status: ${status}. Reason: ${reason}`}
            />
            <Typography fontSize={theme.typography.pxToRem(48)}>{name}</Typography>
          </Stack>
        }
        description={
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon={ICONS.INFO} />
                  <Typography variant="body2">{statusObject.message}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon={ICONS.CALENDAR} />
                  <Typography variant="body2">Started at: {statusObject.startedAt}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon={'mingcute:time-line'} />
                  <Typography variant="body2">Duration: {statusObject.activeDuration}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon={ICONS.REDO} />
                  <Typography variant="body2">
                    Last updated: {statusObject.updatedLast} ago.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
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
