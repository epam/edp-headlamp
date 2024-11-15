import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Box, CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { QuickLink } from '../../components/QuickLink';
import { Section } from '../../components/Section';
import { ICONS } from '../../icons/iconify-icons-mapping';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../k8s/groups/EDP/QuickLink/constants';
import { Tabs } from '../../providers/Tabs/components/Tabs';
import { useTabsContext } from '../../providers/Tabs/hooks';
import { LinkCreationService } from '../../services/link-creation';
import { StageActionsMenu } from '../../widgets/StageActionsMenu';
import { routeCDPipelineDetails } from '../cdpipeline-details/route';
import { routeCDPipelineList } from '../cdpipeline-list/route';
import { routeArgoCD } from '../configuration/pages/argocd/route';
import { usePageTabs } from './hooks/usePageTabs';
import { useTypedPermissions } from './hooks/useTypedPermissions';
import { useDataContext } from './providers/Data/hooks';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams } from './types';

export const PageView = () => {
  const { CDPipelineName, namespace } = useParams<EDPStageDetailsRouteParams>();

  const { CDPipeline, stages, QuickLinks, QuickLinksURLs } = useDataContext();
  const {
    stage: { data: stage, isLoading: isStageLoading },
  } = useDynamicDataContext();

  const grafanaQuickLink =
    QuickLinks && QuickLinks.data?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.GRAFANA);
  const kibanaQuickLink =
    QuickLinks && QuickLinks.data?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.KIBANA);

  const stageSpecName = stage?.spec.name;
  const stageSpecNamespace = stage?.spec.namespace;

  const tabs = usePageTabs();

  const backRoute = Router.createRouteURL(routeCDPipelineDetails.path, {
    name: CDPipelineName,
    namespace,
  });

  const isDataLoading =
    CDPipeline.isLoading || stages.isLoading || QuickLinks.isLoading || QuickLinksURLs.isLoading;

  const permissions = useTypedPermissions();

  const { activeTab, handleChangeTab } = useTabsContext();

  return (
    <PageWrapper
      breadcrumbs={[
        { label: 'Deployment Flows', url: { pathname: routeCDPipelineList.path } },
        {
          label: CDPipelineName,
          url: {
            pathname: routeCDPipelineDetails.path,
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
        !isDataLoading &&
        !isStageLoading && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.ARGOCD],
                value: SYSTEM_QUICK_LINKS.ARGOCD,
              }}
              icon={ICONS.ARGOCD}
              externalLink={LinkCreationService.argocd.createStageLink(
                QuickLinksURLs.data?.[SYSTEM_QUICK_LINKS.ARGOCD],
                CDPipeline.data?.metadata?.name,
                stageSpecName
              )}
              configurationLink={{
                routeName: routeArgoCD.path,
              }}
              isTextButton
            />
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.GRAFANA],
                value: SYSTEM_QUICK_LINKS.GRAFANA,
              }}
              icon={ICONS.GRAFANA}
              externalLink={LinkCreationService.grafana.createDashboardLink(
                QuickLinksURLs.data?.[SYSTEM_QUICK_LINKS.GRAFANA],
                stageSpecNamespace
              )}
              QuickLinkComponent={grafanaQuickLink}
              isTextButton
            />
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.KIBANA],
                value: SYSTEM_QUICK_LINKS.KIBANA,
              }}
              icon={ICONS.KIBANA}
              externalLink={LinkCreationService.kibana.createDashboardLink(
                QuickLinksURLs.data?.[SYSTEM_QUICK_LINKS.KIBANA],
                stageSpecNamespace
              )}
              QuickLinkComponent={kibanaQuickLink}
              isTextButton
            />
            <Box sx={{ ml: (t) => t.typography.pxToRem(20) }}>
              <StageActionsMenu
                data={{
                  stages: stages.data,
                  CDPipelineData: CDPipeline.data,
                  stage,
                }}
                permissions={permissions}
                backRoute={backRoute}
                variant="inline"
              />
            </Box>
          </Stack>
        )
      }
    >
      <Section
        title={stage?.spec.name}
        description={
          'Manage, deploy, test, and troubleshoot your applications across distinct Environments.'
        }
      >
        {!isStageLoading ? (
          <Box sx={{ mt: (t) => t.typography.pxToRem(20) }}>
            <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
          </Box>
        ) : (
          <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
        )}
      </Section>
    </PageWrapper>
  );
};
