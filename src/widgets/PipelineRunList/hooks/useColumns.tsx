import { Icon } from '@iconify/react';
import { HoverInfoLabel, Link } from '@kinvolk/headlamp-plugin/lib/components/common';
import { IconButton, Link as MuiLink } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../components/StatusIcon';
import { TableColumn } from '../../../components/Table/types';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../k8s/PipelineRun/types';
import { SYSTEM_QUICK_LINKS } from '../../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { routeEDPPipelineDetails } from '../../../pages/edp-pipeline-details/route';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { useResourceActionListContext } from '../../../providers/ResourceActionList/hooks';
import { LinkCreationService } from '../../../services/link-creation';
import { formatFullYear, humanizeDefault } from '../../../utils/date/humanize';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from '../../PipelineRunGraph/constants';

export const useColumns = (): TableColumn<PipelineRunKubeObjectInterface>[] => {
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery();

  const { setDialog } = useDialogContext();

  const { handleOpenResourceActionListMenu } =
    useResourceActionListContext<PipelineRunKubeObjectInterface>();

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

          if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
            return <>{name}</>;
          }

          return (
            <Link
              routeName={routeEDPPipelineDetails.path}
              params={{
                name,
                namespace,
              }}
            >
              {name}
            </Link>
          );
        },
        width: '40%',
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

          if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
            return <>{pipelineRefName}</>;
          }

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
      },
      {
        id: 'time',
        label: 'Time',
        render: (resource) => {
          if (!resource?.status?.startTime || !resource?.status?.completionTime) {
            return <HoverInfoLabel label={''} hoverInfo={''} icon={ICONS.CALENDAR} />;
          }

          const startTimeDate = new Date(resource?.status?.startTime);
          const completionTimeDate = new Date(resource?.status?.completionTime);
          const time = humanizeDefault(completionTimeDate.getTime(), startTimeDate.getTime());

          return (
            <HoverInfoLabel
              label={time}
              hoverInfo={
                <>
                  <div>Start: {formatFullYear(startTimeDate)}.</div>
                  <div>End: {completionTimeDate ? formatFullYear(completionTimeDate) : ''}.</div>
                </>
              }
              icon={ICONS.CALENDAR}
            />
          );
        },
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
              size="large"
            >
              <Icon icon={ICONS.DIAGRAM} />
            </IconButton>
          );
        },
      },
      {
        id: 'rerun',
        label: 'Actions',
        render: (resource) => {
          const buttonRef = React.createRef<HTMLButtonElement>();

          return (
            <IconButton
              ref={buttonRef}
              aria-label={'Options'}
              onClick={() => handleOpenResourceActionListMenu(buttonRef.current, resource.jsonData)}
              size="large"
            >
              <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
            </IconButton>
          );
        },
      },
    ],
    [QuickLinksURLS, handleOpenResourceActionListMenu, setDialog]
  );
};
