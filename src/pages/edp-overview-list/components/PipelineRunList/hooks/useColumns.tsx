import { HoverInfoLabel } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Link } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { NewStatusIcon } from '../../../../../components/NewStatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { getStatusIcon } from '../../../../../k8s/PipelineRun/utils/getStatusInfo';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { formatFullYear, humanizeDefault } from '../../../../../utils/date/humanize';
import { EDPComponentDetailsRouteParams } from '../../../../edp-component-details/types';

export const useColumns = (): TableColumn<PipelineRunKubeObjectInterface>[] => {
    const { namespace } = useParams<EDPComponentDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

    return React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                render: resource => {
                    const status = resource?.status?.conditions?.[0]?.status;
                    const reason = resource?.status?.conditions?.[0]?.reason;

                    const [icon, color, isRotating] = getStatusIcon(status, reason);

                    return (
                        <NewStatusIcon
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
                render: resource => {
                    const {
                        metadata: { name, namespace },
                    } = resource;

                    if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
                        return <>{name}</>;
                    }

                    return (
                        <>
                            <Link
                                href={GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                                    EDPComponentsURLS?.tekton,
                                    namespace,
                                    name
                                )}
                                target="_blank"
                                rel="noopener"
                            >
                                {name}
                            </Link>
                        </>
                    );
                },
                width: '40%',
            },
            {
                id: 'pipeline',
                label: 'Pipeline',
                render: resource => {
                    const {
                        metadata: { namespace },
                        spec: {
                            pipelineRef: { name: pipelineRefName },
                        },
                    } = resource;

                    if (!resource?.status?.pipelineSpec?.params?.[0]?.default) {
                        return <>{pipelineRefName}</>;
                    }

                    const pipelineLink = GENERATE_URL_SERVICE.createTektonPipelineLink(
                        EDPComponentsURLS?.tekton,
                        namespace,
                        pipelineRefName
                    );

                    return (
                        <>
                            <Link href={pipelineLink} target="_blank" rel="noopener">
                                {pipelineRefName}
                            </Link>
                        </>
                    );
                },
            },
            {
                id: 'time',
                label: 'Time',
                render: resource => {
                    if (!resource?.status?.startTime || !resource?.status?.completionTime) {
                        return <HoverInfoLabel label={''} hoverInfo={''} icon="mdi:calendar" />;
                    }

                    const startTimeDate = new Date(resource?.status?.startTime);
                    const completionTimeDate = new Date(resource?.status?.completionTime);
                    const time = humanizeDefault(
                        completionTimeDate.getTime(),
                        startTimeDate.getTime()
                    );

                    return (
                        <HoverInfoLabel
                            label={time}
                            hoverInfo={formatFullYear(startTimeDate)}
                            icon="mdi:calendar"
                        />
                    );
                },
            },
        ],
        [EDPComponentsURLS]
    );
};
