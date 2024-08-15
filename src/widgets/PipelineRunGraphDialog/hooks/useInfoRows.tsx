import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Link as MuiLink, Stack } from '@mui/material';
import React from 'react';
import { StatusIcon } from '../../../components/StatusIcon';
import { ICONS } from '../../../icons/iconify-icons-mapping';
import { PipelineRunKubeObject } from '../../../k8s/groups/Tekton/PipelineRun';
import { routePipelineRunDetails } from '../../../pages/pipeline-details/route';
import { useSpecificDialogContext } from '../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../services/link-creation';
import { formatFullYear, humanizeDefault } from '../../../utils/date/humanize';
import { PIPELINE_RUN_GRAPH_DIALOG_NAME } from '../constants';
import { PipelineRunGraphDialogForwardedProps } from '../types';

export const useInfoRows = (tektonBaseURL: string) => {
  const {
    forwardedProps: { pipelineRun },
  } = useSpecificDialogContext<PipelineRunGraphDialogForwardedProps>(
    PIPELINE_RUN_GRAPH_DIALOG_NAME
  );
  const pipelineRunStatus = pipelineRun?.status?.conditions?.[0]?.status || 'Unknown';
  const pipelineRunReason = pipelineRun?.status?.conditions?.[0]?.reason || 'Unknown';
  const pipelineRunMessage = pipelineRun?.status?.conditions?.[0]?.message || 'No message';
  const startTime = pipelineRun?.status?.startTime;
  const completionTime = pipelineRun?.status?.completionTime;
  const pipelineRefName = pipelineRun?.spec?.pipelineRef?.name;
  const pipelineRunName = pipelineRun?.metadata.name;
  const namespace = pipelineRun?.metadata.namespace;

  return React.useMemo(() => {
    const pipelineLink = pipelineRun?.status?.pipelineSpec?.params?.[0]?.default
      ? LinkCreationService.tekton.createPipelineLink(tektonBaseURL, namespace, pipelineRefName)
      : pipelineRefName;

    const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(
      pipelineRunStatus,
      pipelineRunReason
    );

    return [
      [
        {
          label: 'Name',
          text: pipelineRunName,
        },
        {
          label: 'Status',
          text: `${pipelineRunStatus}. Reason: ${pipelineRunReason}.`,
          icon: (
            <StatusIcon
              Title={`${pipelineRunStatus}. Reason: ${pipelineRunReason}`}
              icon={icon}
              color={color}
              isRotating={isRotating}
              width={15}
            />
          ),
        },
        {
          label: 'Message',
          text: pipelineRunMessage,
        },
        {
          label: 'Started at',
          text: startTime ? formatFullYear(new Date(startTime)) : null,
        },
        {
          label: 'Ended at',
          text: completionTime ? formatFullYear(new Date(completionTime)) : null,
        },
        {
          label: 'Duration',
          text:
            startTime && completionTime
              ? humanizeDefault(new Date(completionTime).getTime(), new Date(startTime).getTime())
              : null,
        },
      ],
      [
        {
          label: 'PipelineRun',
          text: (
            <Link
              routeName={routePipelineRunDetails.path}
              params={{
                namespace,
                name: pipelineRunName,
              }}
            >
              {pipelineRunName}
            </Link>
          ),
        },
        {
          label: 'Pipeline',
          text: (
            <MuiLink href={pipelineLink} target="_blank" rel="noopener">
              <Stack direction="row" spacing={1} alignItems="center">
                <span>{pipelineRefName}</span>
                <span>
                  <Icon icon={ICONS.NEW_WINDOW} />
                </span>
              </Stack>
            </MuiLink>
          ),
        },
      ],
    ];
  }, [
    tektonBaseURL,
    namespace,
    pipelineRunName,
    pipelineRun,
    pipelineRefName,
    pipelineRunStatus,
    pipelineRunReason,
    pipelineRunMessage,
    startTime,
    completionTime,
  ]);
};
