import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { StatusIcon } from '../../../../components/StatusIcon';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../k8s/groups/Tekton/PipelineRun/types';
import { routePipelineDetails } from '../../../../pages/pipelines/pages/pipeline-details/route';
import { routePipelineRunDetails } from '../../../../pages/pipelines/pages/pipeline-run-details/route';
import { formatFullYear, humanizeDefault } from '../../../../utils/date/humanize';

export const useInfoRows = (pipelineRun: PipelineRunKubeObjectInterface) => {
  const pipelineRunStatus = pipelineRun?.status?.conditions?.[0]?.status || 'Unknown';
  const pipelineRunReason = pipelineRun?.status?.conditions?.[0]?.reason || 'Unknown';
  const pipelineRunMessage = pipelineRun?.status?.conditions?.[0]?.message || 'No message';
  const startTime = pipelineRun?.status?.startTime;
  const completionTime = pipelineRun?.status?.completionTime;
  const pipelineRefName = pipelineRun?.spec?.pipelineRef?.name;
  const pipelineRunName = pipelineRun?.metadata.name;
  const namespace = pipelineRun?.metadata.namespace;

  return React.useMemo(() => {
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
            <Link
              routeName={routePipelineDetails.path}
              params={{
                name: pipelineRefName,
                namespace,
              }}
            >
              {pipelineRefName}
            </Link>
          ),
        },
      ],
    ];
  }, [
    namespace,
    pipelineRunName,
    pipelineRefName,
    pipelineRunStatus,
    pipelineRunReason,
    pipelineRunMessage,
    startTime,
    completionTime,
  ]);
};
