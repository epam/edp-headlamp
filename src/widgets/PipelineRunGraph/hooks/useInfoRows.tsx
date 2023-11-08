import { Link } from '@material-ui/core';
import React from 'react';
import { StatusIcon } from '../../../components/StatusIcon';
import { PipelineRunKubeObject } from '../../../k8s/PipelineRun';
import { useSpecificDialogContext } from '../../../providers/Dialog/hooks';
import { GENERATE_URL_SERVICE } from '../../../services/url';
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
        const pipelineRunLink = GENERATE_URL_SERVICE.createTektonPipelineRunLink(
            tektonBaseURL,
            namespace,
            pipelineRunName
        );

        const pipelineLink = pipelineRun?.status?.pipelineSpec?.params?.[0]?.default
            ? GENERATE_URL_SERVICE.createTektonPipelineLink(
                  tektonBaseURL,
                  namespace,
                  pipelineRefName
              )
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
                            ? humanizeDefault(
                                  new Date(completionTime).getTime(),
                                  new Date(startTime).getTime()
                              )
                            : null,
                },
            ],
            [
                {
                    label: 'PipelineRun',
                    text: (
                        <Link href={pipelineRunLink} target="_blank" rel="noopener">
                            {pipelineRunName}
                        </Link>
                    ),
                },
                {
                    label: 'Pipeline',
                    text: (
                        <Link href={pipelineLink} target="_blank" rel="noopener">
                            {pipelineRefName}
                        </Link>
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
