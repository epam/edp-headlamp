import { Router } from '@kinvolk/headlamp-plugin/lib';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EDPComponentLink } from '../../components/EDPComponentLink';
import { HorizontalScrollContainer } from '../../components/HorizontalScrollContainer';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { ICONS } from '../../icons/iconify-icons-mapping';
import {
  SYSTEM_EDP_COMPONENTS,
  SYSTEM_EDP_COMPONENTS_LABELS,
} from '../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { LinkCreationService } from '../../services/link-creation';
import { EnvironmentStage } from '../../widgets/EnvironmentStage';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { routeEDPSonarIntegration } from '../edp-configuration/pages/edp-sonar-integration/route';
import { CDPipelineActions } from './components/CDPipelineActions';
import { TableHeaderActions } from './components/TableHeaderActions';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { EDPCDPipelineRouteParams } from './types';

export const PageView = () => {
  const { name, namespace } = useParams<EDPCDPipelineRouteParams>();

  const { CDPipeline, stages, stagesWithApplicationsData } = useDynamicDataContext();
  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

  const isLoading = React.useMemo(() => {
    return CDPipeline.isLoading || stages.isLoading || stagesWithApplicationsData.isLoading;
  }, [CDPipeline, stages, stagesWithApplicationsData]);

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
            <EDPComponentLink
              name={{
                label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.ARGOCD],
                value: SYSTEM_EDP_COMPONENTS.ARGOCD,
              }}
              icon={ICONS.ARGOCD}
              externalLink={LinkCreationService.argocd.createPipelineLink(
                EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.ARGOCD],
                name
              )}
              configurationLink={{
                routeName: routeEDPSonarIntegration.path,
              }}
            />
          </Grid>
          {!CDPipeline.isLoading && (
            <>
              <Grid item>
                <CDPipelineActions
                  CDPipeline={CDPipeline.data}
                  backRoute={Router.createRouteURL(routeEDPCDPipelineList.path)}
                />
              </Grid>
            </>
          )}
        </Grid>
      }
    >
      <Section title={name} description={'Inspect the Environment and operate stages.'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TableHeaderActions CDPipelineStages={stages.data} />
          </Grid>
          <Grid item xs={12} sx={{ pr: '2px' }}>
            <HorizontalScrollContainer>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={6} wrap="nowrap">
                  {stagesWithApplicationsData.data.map(stageWithApplicationsData => {
                    return (
                      <Grid
                        item
                        xs={4}
                        flexShrink="0"
                        key={stageWithApplicationsData.stage.spec.name}
                      >
                        <EnvironmentStage
                          CDPipeline={CDPipeline.data}
                          stageWithApplicationsData={stageWithApplicationsData}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </HorizontalScrollContainer>
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
