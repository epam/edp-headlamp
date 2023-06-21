import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Render } from '../../components/Render';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { StageActionsMenu } from '../../components/StageActionsMenu';
import { ICONS } from '../../constants/icons';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { React } from '../../plugin.globals';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { createArgoCDPipelineLink } from '../../utils/url/createArgoCDPipelineLink';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { CDPipelineActions } from './components/CDPipelineActions';
import { CDPipelineApplicationsTable } from './components/CDPipelineApplicationsTable';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { StageList } from './components/StageList';
import { useCDPipelineContext } from './providers/CDPipeline/hooks';
import { useCDPipelineStagesContext } from './providers/CDPipelineStages/hooks';
import { EDPCDPipelineRouteParams } from './types';

export const PageView = () => {
    const { name } = useParams<EDPCDPipelineRouteParams>();

    const { CDPipeline } = useCDPipelineContext();
    const { stages } = useCDPipelineStagesContext();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();

    const argoCDPipelineLink = React.useMemo(
        () => createArgoCDPipelineLink(EDPComponentsURLS, name),
        [EDPComponentsURLS, name]
    );

    return (
        <>
            <Grid container spacing={1} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                    <Breadcrumbs>
                        <Button
                            size="small"
                            component={Link}
                            routeName={routeEDPCDPipelineList.path}
                        >
                            CD Pipelines
                        </Button>
                        <Typography color="textPrimary">{name}</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <ResourceIconLink
                                tooltipTitle={'Open in ArgoCD'}
                                icon={ICONS.ARGOCD}
                                link={argoCDPipelineLink}
                            />
                        </Grid>
                        <Render condition={!!CDPipeline}>
                            <>
                                <Grid item>
                                    <CDPipelineMetadataTable CDPipelineData={CDPipeline} />
                                </Grid>
                                <Grid item>
                                    <CDPipelineActions CDPipeline={CDPipeline} />
                                </Grid>
                            </>
                        </Render>
                    </Grid>
                </Grid>
            </Grid>
            <Render condition={!!CDPipeline}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CDPipelineApplicationsTable />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceActionListContextProvider>
                            <StageList />
                            <StageActionsMenu stages={stages} />
                        </ResourceActionListContextProvider>
                    </Grid>
                </Grid>
            </Render>
        </>
    );
};
