import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/components/common';
import { IconButton, Link as MuiLink } from '@mui/material';
import React from 'react';
import { ResourceIconLink } from '../../../components/ResourceIconLink';
import { StatusIcon } from '../../../components/StatusIcon';
import { TableColumn } from '../../../components/Table/types';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { SYSTEM_QUICK_LINKS } from '../../../k8s/groups/EDP/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { PipelineRunKubeObject } from '../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../k8s/groups/Tekton/PipelineRun/types';
import { getPullRequestURL } from '../../../k8s/groups/Tekton/PipelineRun/utils/getPullRequestURL';
import { routePipelineDetails } from '../../../pages/pipeline-details/route';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../services/link-creation';
import { PermissionSet } from '../../../types/permissions';
import { humanize } from '../../../utils/date/humanize';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from '../../PipelineRunGraph/constants';
import { Actions } from '../components/Actions';

export const useColumns = ({
  permissions,
}: {
  permissions: PermissionSet;
}): TableColumn<PipelineRunKubeObjectInterface>[] => {
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery();

  const { setDialog } = useDialogContext();

  return React.useMemo(
    () => [
      {
        id: 'status',
        label: 'Status',
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
        render: (resource) => {
          const {
            metadata: { name, namespace },
          } = resource;

          return (
            <Link
              routeName={routePipelineDetails.path}
              params={{
                name,
                namespace,
              }}
            >
              {name}
            </Link>
          );
        },
        width: '30%',
      },
      {
        id: 'pipeline',
        label: 'Pipeline',
        render: (resource) => {
          const {
            metadata: { namespace },
            spec: {
              pipelineRef: { name: pipelineRefName },
            },
          } = resource;

          const pipelineLink = LinkCreationService.tekton.createPipelineLink(
            QuickLinksURLS?.[SYSTEM_QUICK_LINKS.TEKTON],
            namespace,
            pipelineRefName
          );

          return (
            <>
              <MuiLink href={pipelineLink} target="_blank" rel="noopener">
                {pipelineRefName}
              </MuiLink>
            </>
          );
        },
        width: '30%',
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
        width: '10%',
      },
      {
        id: 'diagram',
        label: 'Diagram',
        render: (resource) => {
          return (
            <IconButton
              onClick={() =>
                setDialog({
                  modalName: PIPELINE_RUN_GRAPH_DIALOG_NAME,
                  forwardedProps: {
                    pipelineRun: resource,
                  },
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
        render: (resource) => <Actions resource={resource?.jsonData} permissions={permissions} />,
        width: '5%',
      },
    ],
    [QuickLinksURLS, permissions, setDialog]
  );
};
