import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/components/common';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { CopyButton } from '../../../components/CopyButton';
import { ResourceIconLink } from '../../../components/ResourceIconLink';
import { StatusIcon } from '../../../components/StatusIcon';
import { SavedTableSettings } from '../../../components/Table/components/TableSettings/types';
import { getSavedColumnData } from '../../../components/Table/components/TableSettings/utils';
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
import { PipelineRunResults } from '../../PipelineRunResults';
import { Actions } from '../components/Actions';
import { columnNames } from '../constants';
import { WidgetPermissions } from '../types';

export const useColumns = ({
  permissions,
  tableSettings,
}: {
  permissions: WidgetPermissions;
  tableSettings: SavedTableSettings;
}): TableColumn<PipelineRunKubeObjectInterface>[] => {
  const { setDialog } = useDialogContext();

  return React.useMemo(
    () => [
      {
        id: columnNames.STATUS,
        label: 'Status',
        data: {
          columnSortableValuePath: 'status.conditions[0].status',
          render: ({ data }) => {
            const status = PipelineRunKubeObject.parseStatus(data);
            const reason = PipelineRunKubeObject.parseStatusReason(data);

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
        },
        cell: {
          isFixed: true,
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.STATUS)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.STATUS)?.show ?? true,
        },
      },
      {
        id: columnNames.RUN,
        label: 'Run',
        data: {
          columnSortableValuePath: 'metadata.name',
          render: ({ data }) => {
            const {
              metadata: { name, namespace },
            } = data;

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
        },
        cell: {
          baseWidth: 20,
          width: getSavedColumnData(tableSettings, columnNames.RUN)?.width ?? 20,
          show: getSavedColumnData(tableSettings, columnNames.RUN)?.show ?? true,
          customizable: false,
        },
      },
      {
        id: columnNames.PIPELINE,
        label: 'Pipeline',
        data: {
          columnSortableValuePath: 'spec.pipelineRef.name',
          render: ({ data }) => {
            const {
              metadata: { namespace },
              spec: {
                pipelineRef: { name: pipelineRefName },
              },
            } = data;

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
        },
        cell: {
          baseWidth: 20,
          width: getSavedColumnData(tableSettings, columnNames.PIPELINE)?.width ?? 20,
          show: getSavedColumnData(tableSettings, columnNames.PIPELINE)?.show ?? true,
        },
      },
      {
        id: columnNames.RESULTS,
        label: 'Results',
        data: {
          render: ({ data }) => {
            const vcsTag = data?.status?.results?.find((el) => el.name === 'VCS_TAG')?.value;

            if (!vcsTag) {
              return null;
            }

            return (
              <Tooltip title={<PipelineRunResults pipelineRun={data} />}>
                <Stack direction="row" alignItems="center">
                  <Typography variant="body2" sx={{ borderBottom: '1px dashed black' }}>
                    {vcsTag}
                  </Typography>
                  <CopyButton text={vcsTag} size="small" />
                </Stack>
              </Tooltip>
            );
          },
        },
        cell: {
          baseWidth: 15,
          width: getSavedColumnData(tableSettings, columnNames.RESULTS)?.width ?? 15,
          show: getSavedColumnData(tableSettings, columnNames.RESULTS)?.show ?? true,
        },
      },
      {
        id: columnNames.PULL_REQUEST,
        label: 'Pull Request',
        data: {
          render: ({ data }) => {
            const link = getPullRequestURL(data);

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
        },
        cell: {
          baseWidth: 10,
          width: getSavedColumnData(tableSettings, columnNames.PULL_REQUEST)?.width ?? 10,
          show: getSavedColumnData(tableSettings, columnNames.PULL_REQUEST)?.show ?? true,

          props: {
            align: 'center',
          },
        },
      },
      {
        id: columnNames.STARTED_AT,
        label: 'Started at',
        data: {
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
          render: ({ data }) => {
            const startedAt = new Date(data.status?.startTime).toLocaleString('en-mini', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            });

            return startedAt;
          },
        },
        cell: {
          baseWidth: 10,
          width: getSavedColumnData(tableSettings, columnNames.STARTED_AT)?.width ?? 10,
          show: getSavedColumnData(tableSettings, columnNames.STARTED_AT)?.show ?? true,
        },
      },
      {
        id: columnNames.TIME,
        label: 'Time',
        data: {
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
          render: ({ data }) => {
            const completionTime = data?.status?.completionTime;
            const durationTime = !!completionTime
              ? new Date(completionTime).getTime() - new Date(data.status?.startTime).getTime()
              : new Date().getTime() - new Date(data.status?.startTime).getTime();

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
        },
        cell: {
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.TIME)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.TIME)?.show ?? true,
        },
      },
      {
        id: columnNames.DIAGRAM,
        label: 'Diagram',
        data: {
          render: ({ data }) => {
            return (
              <IconButton
                onClick={() =>
                  setDialog(PipelineRunGraphDialog, {
                    pipelineRun: data,
                  })
                }
                size="medium"
              >
                <Icon icon={ICONS.DIAGRAM} />
              </IconButton>
            );
          },
        },
        cell: {
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.DIAGRAM)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.DIAGRAM)?.show ?? true,
          isFixed: true,
        },
      },
      {
        id: columnNames.ACTIONS,
        label: 'Actions',
        data: {
          render: ({ data }) => <Actions resource={data} permissions={permissions} />,
        },
        cell: {
          baseWidth: 5,
          width: getSavedColumnData(tableSettings, columnNames.ACTIONS)?.width ?? 5,
          show: getSavedColumnData(tableSettings, columnNames.ACTIONS)?.show ?? true,
          isFixed: true,
          customizable: false,
        },
      },
    ],
    [permissions, setDialog, tableSettings]
  );
};
