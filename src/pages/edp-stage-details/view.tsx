import { Router } from '@kinvolk/headlamp-plugin/lib';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EDPComponentLink } from '../../components/EDPComponentLink';
import { InfoColumnsAccordion } from '../../components/InfoColumns';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { Tabs } from '../../components/Tabs';
import { ICONS } from '../../icons/iconify-icons-mapping';
import {
  SYSTEM_EDP_COMPONENTS,
  SYSTEM_EDP_COMPONENTS_LABELS,
} from '../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { LinkCreationService } from '../../services/link-creation';
import { rem } from '../../utils/styling/rem';
import { routeEDPCDPipelineDetails } from '../edp-cdpipeline-details/route';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { routeEDPArgoCDIntegration } from '../edp-configuration/pages/edp-argocd-integration/route';
import { routeEDPComponentDetails } from '../edp-configuration/pages/edp-component-details/route';
import { StageActions } from './components/StageActions';
import { useInfoColumns } from './hooks/useInfoColumns';
import { usePageTabs } from './hooks/usePageTabs';
import { useDataContext } from './providers/Data/hooks';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from './types';

export const PageView = () => {
  const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();
  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);

  const { CDPipeline } = useDataContext();
  const {
    stage: { data: stage, isLoading },
  } = useDynamicDataContext();

  const stageSpecName = stage?.spec.name;

  const tabs = usePageTabs();
  const infoColumns = useInfoColumns();

  const backRoute = Router.createRouteURL(routeEDPCDPipelineDetails.path, {
    name: CDPipelineName,
    namespace,
  });

  return (
    <PageWrapper
      breadcrumbs={[
        { label: 'Environments', url: { pathname: routeEDPCDPipelineList.path } },
        {
          label: CDPipelineName,
          url: {
            pathname: routeEDPCDPipelineDetails.path,
            params: {
              name: CDPipelineName,
              namespace: namespace,
            },
          },
        },
        {
          label: stageSpecName,
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
              externalLink={LinkCreationService.argocd.createStageLink(
                EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.ARGOCD],
                CDPipeline?.metadata?.name,
                stageSpecName
              )}
              configurationLink={{
                routeName: routeEDPArgoCDIntegration.path,
              }}
            />
          </Grid>
          <Grid item>
            <EDPComponentLink
              name={{
                label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.GRAFANA],
                value: SYSTEM_EDP_COMPONENTS.GRAFANA,
              }}
              icon={ICONS.GRAFANA}
              externalLink={LinkCreationService.grafana.createDashboardLink(
                EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.GRAFANA],
                stage?.spec.namespace
              )}
              configurationLink={{
                routeName: routeEDPComponentDetails.path,
                routeParams: {
                  name: SYSTEM_EDP_COMPONENTS.GRAFANA,
                  namespace,
                },
              }}
            />
          </Grid>
          <Grid item>
            <EDPComponentLink
              name={{
                label: SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.KIBANA],
                value: SYSTEM_EDP_COMPONENTS.KIBANA,
              }}
              icon={ICONS.KIBANA}
              externalLink={LinkCreationService.kibana.createDashboardLink(
                EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.KIBANA],
                stage?.spec.namespace
              )}
              configurationLink={{
                routeName: routeEDPComponentDetails.path,
                routeParams: {
                  name: SYSTEM_EDP_COMPONENTS.KIBANA,
                  namespace,
                },
              }}
            />
          </Grid>
          <Grid item style={{ marginLeft: rem(20) }}>
            <StageActions stage={stage} backRoute={backRoute} />
          </Grid>
        </Grid>
      }
    >
      <Section
        title={stage?.spec.name}
        description={
          'Manage, deploy, test, and troubleshoot your applications across distinct  stages.'
        }
      >
        {!isLoading ? (
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginTop: rem(20) }}>
              <InfoColumnsAccordion title={'Stage Details'} infoRows={infoColumns} />
            </Grid>
            <Grid item xs={12}>
              <Tabs tabs={tabs} initialTabIdx={0} />
            </Grid>
          </Grid>
        ) : (
          <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
        )}
      </Section>
    </PageWrapper>
  );
};
