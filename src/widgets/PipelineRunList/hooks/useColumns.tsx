import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/components/common';
import { IconButton } from '@mui/material';
import React from 'react';
import { ResourceIconLink } from '../../../components/ResourceIconLink';
import { StatusIcon } from '../../../components/StatusIcon';
import { TableColumn } from '../../../components/Table/types';
import { TextWithTooltip } from '../../../components/TextWithTooltip';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { getPullRequestURL } from '../../../k8s/groups/Tekton/PipelineRun/utils/getPullRequestURL';
import { routePipelineDetails } from '../../../pages/configuration/pages/pipeline-details/route';
import { routePipelineRunDetails } from '../../../pages/pipeline-details/route';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { humanize } from '../../../utils/date/humanize';
import { PipelineRunGraphDialog } from '../../dialogs/PipelineRunGraph';
import { Actions } from '../components/Actions';
import { WidgetPermissions } from '../types';

export const useColumns = ({
  permissions,
}: {
  permissions: WidgetPermissions;
}): TableColumn<PipelineRunKubeObjectInterface>[] => {
  const { setDialog } = useDialogContext();

  return React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
        columnSortableValuePath: 'status.conditions[0].status',
        render: (resource) => {
          const status = PipelineRunKubeObject.parseStatus(resource);
          const reason = PipelineRunKubeObject.parseStatusReason(resource);

          const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(status, reason);

          return (
            <StatusIcon
              icon={icon}
              color={color}
              isRotating={isRotating}
              width={25}
              Title={`Status: ${status}. Reason: ${reason}`}
            />
          );
        },
        width: '5%',
      },
      {
        id: 'run',
        label: 'Run',
        columnSortableValuePath: 'metadata.name',
        render: (resource) => {
          const {
            metadata: { name, namespace },
          } = resource;

          return (
            <Link
              routeName={routePipelineRunDetails.path}
              params={{
                name,
                namespace,
              }}
            >
              <TextWithTooltip text={name} />
            </Link>
          );
        },
        width: '15%',
      },
      {
        id: 'pipeline',
        label: 'Pipeline',
        columnSortableValuePath: 'spec.pipelineRef.name',
        render: (resource) => {
          const {
            metadata: { namespace },
            spec: {
              pipelineRef: { name: pipelineRefName },
            },
          } = resource;

          return (
            <Link
              routeName={routePipelineDetails.path}
              params={{
                name: pipelineRefName,
                namespace,
              }}
            >
              <TextWithTooltip text={pipelineRefName} />
            </Link>
          );
        },
        width: '15%',
      },
      {
        id: 'pullRequestUrl',
        label: 'Pull Request',
        render: (resource) => {
          const link = getPullRequestURL(resource);

          if (!link) {
            return null;
          }

          return (
            <ResourceIconLink
              tooltipTitle={'Go to the Pull Request page'}
              link={link}
              icon={ICONS.NEW_WINDOW}
              name="pull request"
            />
          );
        },
        width: '10%',
        textAlign: 'center',
      },
      {
        id: 'startedAt',
        label: 'Started at',
        customSortFn: (a, b) => {
          const aStartTime = a?.status?.startTime;
          const bStartTime = b?.status?.startTime;

          const aStartTimeDate = new Date(aStartTime).getTime();
          const bStartTimeDate = new Date(bStartTime).getTime();

          if (aStartTimeDate < bStartTimeDate) {
            return -1;
          } else if (aStartTimeDate > bStartTimeDate) {
            return 1;
          }

          return 0;
        },
        render: (resource) => {
          const startedAt = new Date(resource.status?.startTime).toLocaleString('en-mini', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          });

          return startedAt;
        },
        width: '15%',
      },
      {
        id: 'time',
        label: 'Time',
        customSortFn: (a, b) => {
          const aStartTime = a?.status?.startTime;
          const aCompletionTime = a?.status?.completionTime;
          const bStartTime = b?.status?.startTime;
          const bCompletionTime = b?.status?.completionTime;

          const aDurationTime = !!aCompletionTime
            ? new Date(aCompletionTime).getTime() - new Date(aStartTime).getTime()
            : new Date().getTime() - new Date(aStartTime).getTime();

          const bDurationTime = !!bCompletionTime
            ? new Date(bCompletionTime).getTime() - new Date(bStartTime).getTime()
            : new Date().getTime() - new Date(bStartTime).getTime();

          if (aDurationTime < bDurationTime) {
            return -1;
          } else if (aDurationTime > bDurationTime) {
            return 1;
          }

          return 0;
        },
        render: (resource) => {
          const completionTime = resource?.status?.completionTime;
          const durationTime = !!completionTime
            ? new Date(completionTime).getTime() - new Date(resource.status?.startTime).getTime()
            : new Date().getTime() - new Date(resource.status?.startTime).getTime();

          const activeDuration = humanize(durationTime, {
            language: 'en-mini',
            spacer: '',
            delimiter: ' ',
            fallbacks: ['en'],
            largest: 2,
            round: true,
            units: ['d', 'h', 'm', 's'],
          });

          return activeDuration;
        },
        width: '30%',
      },
      {
        id: 'diagram',
        label: 'Diagram',
        render: (resource) => {
          return (
            <IconButton
              onClick={() =>
                setDialog(PipelineRunGraphDialog, {
                  pipelineRun: resource,
                })
              }
              size="medium"
            >
              <Icon icon={ICONS.DIAGRAM} />
            </IconButton>
          );
        },
        width: '5%',
      },
      {
        id: 'rerun',
        label: 'Actions',
        render: (resource) => <Actions resource={resource} permissions={permissions} />,
        width: '5%',
      },
    ],
    [permissions, setDialog]
  );
};
