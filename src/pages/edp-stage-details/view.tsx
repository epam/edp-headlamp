import { Router } from '@kinvolk/headlamp-plugin/lib';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { InfoColumnsAccordion } from '../../components/InfoColumns';
import { PageWrapper } from '../../components/PageWrapper';
import { QuickLink } from '../../components/QuickLink';
import { Section } from '../../components/Section';
import { Tabs } from '../../components/Tabs';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SYSTEM_QUICK_LINKS, SYSTEM_QUICK_LINKS_LABELS } from '../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { LinkCreationService } from '../../services/link-creation';
import { rem } from '../../utils/styling/rem';
import { StageActionsMenu } from '../../widgets/StageActionsMenu';
import { routeEDPCDPipelineDetails } from '../edp-cdpipeline-details/route';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { routeEDPArgoCDIntegration } from '../edp-configuration/pages/edp-argocd-integration/route';
import { routeQuickLinkDetails } from '../edp-configuration/pages/edp-quick-link-details/route';
import { useInfoColumns } from './hooks/useInfoColumns';
import { usePageTabs } from './hooks/usePageTabs';
import { useDataContext } from './providers/Data/hooks';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from './types';

export const PageView = () => {
  const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);

  const { CDPipeline, stages } = useDataContext();
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
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.ARGOCD],
                value: SYSTEM_QUICK_LINKS.ARGOCD,
              }}
              icon={ICONS.ARGOCD}
              externalLink={LinkCreationService.argocd.createStageLink(
                QuickLinksURLS?.[SYSTEM_QUICK_LINKS.ARGOCD],
                CDPipeline?.metadata?.name,
                stageSpecName
              )}
              configurationLink={{
                routeName: routeEDPArgoCDIntegration.path,
              }}
            />
          </Grid>
          <Grid item>
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.GRAFANA],
                value: SYSTEM_QUICK_LINKS.GRAFANA,
              }}
              icon={ICONS.GRAFANA}
              externalLink={LinkCreationService.grafana.createDashboardLink(
                QuickLinksURLS?.[SYSTEM_QUICK_LINKS.GRAFANA],
                stage?.spec.namespace
              )}
              configurationLink={{
                routeName: routeQuickLinkDetails.path,
                routeParams: {
                  name: SYSTEM_QUICK_LINKS.GRAFANA,
                  namespace,
                },
              }}
            />
          </Grid>
          <Grid item>
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.KIBANA],
                value: SYSTEM_QUICK_LINKS.KIBANA,
              }}
              icon={ICONS.KIBANA}
              externalLink={LinkCreationService.kibana.createDashboardLink(
                QuickLinksURLS?.[SYSTEM_QUICK_LINKS.KIBANA],
                stage?.spec.namespace
              )}
              configurationLink={{
                routeName: routeQuickLinkDetails.path,
                routeParams: {
                  name: SYSTEM_QUICK_LINKS.KIBANA,
                  namespace,
                },
              }}
            />
          </Grid>
          <Grid item style={{ marginLeft: rem(20) }}>
            {!!stages && (
              <StageActionsMenu
                data={{
                  stages: stages?.items,
                  CDPipelineData: CDPipeline,
                  stage,
                }}
                backRoute={backRoute}
                variant="inline"
              />
            )}
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
