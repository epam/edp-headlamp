import { Link as MuiLink } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { formatDateToDuration } from '../../../../../utils/format/formatDateToDuration';
import { formatDateUTCToLocal } from '../../../../../utils/format/formatDateUTCToLocal';
import { EDPStageDetailsRouteParams } from '../../../types';

export const useColumns = (): TableColumn<PipelineRunKubeObjectInterface>[] => {
    const { namespace } = useParams<EDPStageDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

    return React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                render: pipelineRun => {
                    const status = PipelineRunKubeObject.parseStatus(pipelineRun);
                    const reason = PipelineRunKubeObject.parseStatusReason(pipelineRun);

                    const [icon, color, isRotating] = PipelineRunKubeObject.getStatusIcon(
                        status,
                        reason
                    );

                    return (
                        <StatusIcon
                            icon={icon}
                            color={color}
                            isRotating={isRotating}
                            width={25}
                            Title={`Status: ${status || 'Unknown'}. Reason: ${reason || 'Unknown'}`}
                        />
                    );
                },
                width: '10%',
            },
            {
                id: 'name',
                label: 'Name',
                render: ({ metadata: { name, namespace } }) => (
                    <MuiLink
                        href={GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                            EDPComponentsURLS?.tekton,
                            namespace,
                            name
                        )}
                        target={'_blank'}
                    >
                        {name}
                    </MuiLink>
                ),
                width: '50%',
            },
            {
                id: 'startTime',
                label: 'Start time',
                render: ({ status }) => formatDateUTCToLocal(status?.startTime),
            },
            {
                id: 'duration',
                label: 'Duration',
                render: ({ status }) =>
                    formatDateToDuration(status?.startTime, status?.completionTime),
            },
        ],
        [EDPComponentsURLS]
    );
};
