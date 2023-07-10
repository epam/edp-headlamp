import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { StageActionsMenu } from '../../components/StageActionsMenu';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
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
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'CD Pipelines',
                    url: {
                        pathname: routeEDPCDPipelineList.path,
                    },
                },
                {
                    label: name,
                },
            ]}
            headerSlot={
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
            }
        >
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
        </PageWrapper>
    );
};
