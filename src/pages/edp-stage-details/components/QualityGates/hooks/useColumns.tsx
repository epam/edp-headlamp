import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Link as MuiLink } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { EDPCDPipelineStageSpecQualityGatesInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { routeEDPComponentDetails } from '../../../../edp-component-details/route';
import { EDPStageDetailsRouteParams } from '../../../types';

export const useColumns = (): TableColumn<{
    qualityGate: EDPCDPipelineStageSpecQualityGatesInterface;
    autotestPipelineRun: PipelineRunKubeObjectInterface;
}>[] => {
    const { namespace } = useParams<EDPStageDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

    return React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                render: ({ autotestPipelineRun }) => {
                    return (
                        <StatusIcon
                            status={
                                autotestPipelineRun?.status?.conditions?.[0]?.reason?.toLowerCase() ||
                                CUSTOM_RESOURCE_STATUSES.UNKNOWN
                            }
                        />
                    );
                },
                width: '10%',
            },
            {
                id: 'type',
                label: 'Type',
                render: ({ qualityGate: { qualityGateType } }) => qualityGateType,
                width: '15%',
            },
            {
                id: 'step',
                label: 'Step',
                render: ({ qualityGate: { stepName }, autotestPipelineRun }) => {
                    const tektonLink =
                        autotestPipelineRun &&
                        GENERATE_URL_SERVICE.createTektonPipelineRunLink(
                            EDPComponentsURLS?.tekton,
                            autotestPipelineRun?.metadata?.namespace,
                            autotestPipelineRun?.metadata?.name
                        );

                    return tektonLink ? (
                        <MuiLink href={tektonLink} target={'_blank'}>
                            {stepName}
                        </MuiLink>
                    ) : (
                        stepName
                    );
                },
                width: '15%',
            },
            {
                id: 'autotest',
                label: 'Autotest',
                render: ({ qualityGate: { autotestName } }) => {
                    return autotestName ? (
                        <Link
                            routeName={routeEDPComponentDetails.path}
                            params={{
                                name: autotestName,
                                namespace,
                            }}
                        >
                            {autotestName}
                        </Link>
                    ) : (
                        autotestName
                    );
                },
                width: '40%',
            },
            {
                id: 'branch',
                label: 'Branch',
                render: ({ qualityGate: { branchName } }) => branchName,
            },
        ],
        [EDPComponentsURLS, namespace]
    );
};