import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { LinkCreationService } from '../../services/link-creation';
import { StageActionsMenu } from '../../widgets/StageActionsMenu';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { CDPipelineActions } from './components/CDPipelineActions';
import { CDPipelineApplicationsTable } from './components/CDPipelineApplicationsTable';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { StageList } from './components/StageList';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { EDPCDPipelineRouteParams } from './types';

export const PageView = () => {
    const { name, namespace } = useParams<EDPCDPipelineRouteParams>();

    const { CDPipeline, stages } = useDynamicDataContext();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

    return (
        <PageWrapper
            breadcrumbs={[
                {
                    label: 'Environments',
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
                            icon={ICONS.ARGOCD}
                            tooltipTitle={'Open in ArgoCD'}
                            link={LinkCreationService.argocd.createPipelineLink(
                                EDPComponentsURLS?.argocd,
                                name
                            )}
                        />
                    </Grid>
                    {!!CDPipeline && (
                        <>
                            <Grid item>
                                <CDPipelineMetadataTable CDPipelineData={CDPipeline} />
                            </Grid>
                            <Grid item>
                                <CDPipelineActions
                                    CDPipeline={CDPipeline}
                                    backRoute={Router.createRouteURL(routeEDPCDPipelineList.path)}
                                />
                            </Grid>
                        </>
                    )}
                </Grid>
            }
        >
            {!!CDPipeline && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CDPipelineApplicationsTable />
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceActionListContextProvider>
                            <StageList />
                            <StageActionsMenu stages={stages} CDPipelineData={CDPipeline} />
                        </ResourceActionListContextProvider>
                    </Grid>
                </Grid>
            )}
        </PageWrapper>
    );
};
