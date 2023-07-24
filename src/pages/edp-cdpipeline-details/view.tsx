import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { Render } from '../../components/Render';
import { ResourceIconLink } from '../../components/ResourceIconLink';
import { StageActionsMenu } from '../../components/StageActionsMenu';
import { CI_TOOLS } from '../../constants/ciTools';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { GENERATE_URL_SERVICE } from '../../services/url';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { CDPipelineActions } from './components/CDPipelineActions';
import { CDPipelineApplicationsTable } from './components/CDPipelineApplicationsTable';
import { CDPipelineMetadataTable } from './components/CDPipelineMetadataTable';
import { StageList } from './components/StageList';
import { useCDPipelineContext } from './providers/CDPipeline/hooks';
import { useCDPipelineStagesContext } from './providers/CDPipelineStages/hooks';
import { useEnrichedApplicationsContext } from './providers/EnrichedApplications/hooks';
import { EDPCDPipelineRouteParams } from './types';

export const PageView = () => {
    const { name } = useParams<EDPCDPipelineRouteParams>();

    const { CDPipeline } = useCDPipelineContext();
    const { stages } = useCDPipelineStagesContext();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const { enrichedApplications } = useEnrichedApplicationsContext();

    const ciTool = enrichedApplications?.[0]?.application?.spec.ciTool;

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
                        <Render condition={ciTool === CI_TOOLS.JENKINS}>
                            <ResourceIconLink
                                icon={ICONS.JENKINS}
                                tooltipTitle={'Open in Jenkins'}
                                link={GENERATE_URL_SERVICE.createJenkinsPipelineLink(
                                    EDPComponentsURLS?.jenkins,
                                    CDPipeline?.metadata?.name
                                )}
                            />
                        </Render>
                        <Render condition={ciTool === CI_TOOLS.TEKTON}>
                            <ResourceIconLink
                                icon={ICONS.ARGOCD}
                                tooltipTitle={'Open in ArgoCD'}
                                link={GENERATE_URL_SERVICE.createArgoCDPipelineLink(
                                    EDPComponentsURLS?.argocd,
                                    name
                                )}
                            />
                        </Render>
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
