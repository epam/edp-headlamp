import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Chip, Grid, IconButton, Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Render } from '../../../../../components/Render';
import { ResourceIconLink } from '../../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import { CI_TOOLS } from '../../../../../constants/ciTools';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { TRIGGER_TYPES } from '../../../../../constants/triggerTypes';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObject } from '../../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useResourceActionListContext } from '../../../../../providers/ResourceActionList/hooks';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { rem } from '../../../../../utils/styling/rem';
import { routeEDPStageDetails } from '../../../../edp-stage-details/route';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EDPCDPipelineRouteParams } from '../../../types';

export const useColumns = (
    classes: ClassNameMap<'labelChip' | 'labelChipBlue' | 'labelChipGreen'>
): TableColumn<EDPCDPipelineStageKubeObjectInterface>[] => {
    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();
    const { name: CDPipelineName, namespace } = useParams<EDPCDPipelineRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const { enrichedApplications } = useDynamicDataContext();

    const ciTool = enrichedApplications?.[0]?.application?.spec.ciTool;

    return React.useMemo(
        () => [
            {
                id: 'status',
                label: 'Status',
                render: CDPipeline => {
                    const status = CDPipeline?.status?.status;
                    const detailedMessage = CDPipeline?.status?.detailed_message;

                    const [icon, color, isRotating] =
                        EDPCDPipelineStageKubeObject.getStatusIcon(status);
                    return (
                        <StatusIcon
                            icon={icon}
                            color={color}
                            isRotating={isRotating}
                            Title={
                                <>
                                    <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                        {`Status: ${status || 'Unknown'}`}
                                    </Typography>
                                    <Render condition={status === CUSTOM_RESOURCE_STATUSES.FAILED}>
                                        <Typography
                                            variant={'subtitle2'}
                                            style={{ marginTop: rem(10) }}
                                        >
                                            {detailedMessage}
                                        </Typography>
                                    </Render>
                                </>
                            }
                        />
                    );
                },
                width: '10%',
            },
            {
                id: 'stage',
                label: 'Stage',
                render: ({ spec: { name: specName }, metadata: { name: metadataName } }) => {
                    return (
                        <Link
                            routeName={routeEDPStageDetails.path}
                            params={{
                                CDPipelineName,
                                namespace,
                                stageName: metadataName,
                            }}
                        >
                            {specName}
                        </Link>
                    );
                },
                width: '20%',
            },
            {
                id: 'triggerType',
                label: 'Trigger Type',
                render: ({ spec: { triggerType } }) => {
                    const isManualTriggerType = triggerType === TRIGGER_TYPES.MANUAL;

                    return isManualTriggerType ? (
                        <Chip
                            label="manual"
                            className={clsx([classes.labelChip, classes.labelChipBlue])}
                        />
                    ) : (
                        <Chip
                            label="auto"
                            className={clsx([classes.labelChip, classes.labelChipGreen])}
                        />
                    );
                },
                width: '20%',
            },
            {
                id: 'links',
                label: 'Links',
                render: stage => {
                    return (
                        <Grid container spacing={1}>
                            <Grid item>
                                <Render condition={ciTool === CI_TOOLS.JENKINS}>
                                    <ResourceIconLink
                                        icon={ICONS.JENKINS}
                                        tooltipTitle={'Open in Jenkins'}
                                        link={GENERATE_URL_SERVICE.createJenkinsPipelineStageLink(
                                            EDPComponentsURLS?.jenkins,
                                            CDPipelineName,
                                            stage.spec.name
                                        )}
                                    />
                                </Render>
                                <Render condition={ciTool === CI_TOOLS.TEKTON}>
                                    <ResourceIconLink
                                        icon={ICONS.ARGOCD}
                                        tooltipTitle={'Open in ArgoCD'}
                                        link={GENERATE_URL_SERVICE.createArgoCDStageLink(
                                            EDPComponentsURLS?.argocd,
                                            CDPipelineName,
                                            stage.spec.name
                                        )}
                                    />
                                </Render>
                            </Grid>
                            <Grid item>
                                <ResourceIconLink
                                    icon={ICONS.GRAFANA}
                                    tooltipTitle={'Open in Grafana'}
                                    link={GENERATE_URL_SERVICE.createGrafanaLink(
                                        EDPComponentsURLS?.grafana,
                                        stage.spec.namespace
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <ResourceIconLink
                                    icon={ICONS.KIBANA}
                                    tooltipTitle={'Open in Kibana'}
                                    link={GENERATE_URL_SERVICE.createKibanaLink(
                                        EDPComponentsURLS?.kibana,
                                        stage.spec.namespace
                                    )}
                                />
                            </Grid>
                            <Grid item>
                                <ResourceIconLink
                                    icon={ICONS.KUBERNETES}
                                    tooltipTitle={stage?.spec.clusterName}
                                    link={null}
                                />
                            </Grid>
                        </Grid>
                    );
                },
                width: '40%',
            },
            {
                id: 'actions',
                label: '',
                render: stage => {
                    const buttonRef = React.createRef<HTMLButtonElement>();

                    return (
                        <IconButton
                            ref={buttonRef}
                            aria-label={'Options'}
                            onClick={() =>
                                handleOpenResourceActionListMenu(buttonRef.current, stage)
                            }
                        >
                            <Icon icon={ICONS.THREE_DOTS} color={'grey'} width="20" />
                        </IconButton>
                    );
                },
                textAlign: 'right',
            },
        ],
        [
            CDPipelineName,
            EDPComponentsURLS,
            ciTool,
            classes,
            handleOpenResourceActionListMenu,
            namespace,
        ]
    );
};
