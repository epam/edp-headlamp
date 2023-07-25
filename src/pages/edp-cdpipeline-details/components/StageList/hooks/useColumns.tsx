import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Chip, Grid, IconButton, Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { ResourceIconLink } from '../../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { CI_TOOLS } from '../../../../../constants/ciTools';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../constants/statuses';
import { TRIGGER_TYPES } from '../../../../../constants/triggerTypes';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../k8s/EDPCDPipelineStage/types';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useResourceActionListContext } from '../../../../../providers/ResourceActionList/hooks';
import { GENERATE_URL_SERVICE } from '../../../../../services/url';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { rem } from '../../../../../utils/styling/rem';
import { routeEDPStageDetails } from '../../../../edp-stage-details/route';
import { useEnrichedApplicationsContext } from '../../../providers/EnrichedApplications/hooks';
import { EDPCDPipelineRouteParams } from '../../../types';

export const useColumns = (
    classes: ClassNameMap<'labelChip' | 'labelChipBlue' | 'labelChipGreen'>
): HeadlampSimpleTableGetterColumn<EDPCDPipelineStageKubeObjectInterface>[] => {
    const { handleOpenResourceActionListMenu } =
        useResourceActionListContext<EDPCDPipelineStageKubeObjectInterface>();
    const { name: CDPipelineName, namespace } = useParams<EDPCDPipelineRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const { enrichedApplications } = useEnrichedApplicationsContext();

    const ciTool = enrichedApplications?.[0]?.application?.spec.ciTool;

    return React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status }) => {
                    return (
                        <StatusIcon
                            status={status?.status}
                            customTitle={
                                <>
                                    <Typography variant={'subtitle2'} style={{ fontWeight: 600 }}>
                                        {capitalizeFirstLetter(status?.status)}
                                    </Typography>
                                    <Render
                                        condition={
                                            status?.status === CUSTOM_RESOURCE_STATUSES.FAILED
                                        }
                                    >
                                        <Typography
                                            variant={'subtitle2'}
                                            style={{ marginTop: rem(10) }}
                                        >
                                            {status?.detailed_message}
                                        </Typography>
                                    </Render>
                                </>
                            }
                        />
                    );
                },
            },
            {
                label: 'Stage',
                getter: ({ spec: { name: specName }, metadata: { name: metadataName } }) => {
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
            },
            {
                label: 'Trigger Type',
                getter: ({ spec: { triggerType } }) => {
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
            },
            {
                label: 'Links',
                getter: stage => {
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
            },
            {
                label: '',
                getter: stage => {
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
