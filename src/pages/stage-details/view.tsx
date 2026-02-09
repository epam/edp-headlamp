import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Box, Stack } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorContent } from '../../components/ErrorContent';
import { LearnMoreLink } from '../../components/LearnMoreLink';
import { LoadingWrapper } from '../../components/LoadingWrapper';
import { PageWrapper } from '../../components/PageWrapper';
import { QuickLink } from '../../components/QuickLink';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../k8s/groups/EDP/QuickLink/constants';
import { QUICK_LINK_LABEL_SELECTOR_TYPE } from '../../k8s/groups/EDP/QuickLink/labels';
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

  const { CDPipeline, stages, QuickLinks, QuickLinksURLs, enrichedApplications } = useDataContext();
  const {
    stage,
    pipelineRuns,
    deployPipelineRuns,
    cleanPipelineRuns,
    argoApplications,
    newPipelineRunAdded,
    setNewPipelineRunAdded,
    variablesConfigMap,
  } = useDynamicDataContext();

  const monitoringQuickLink =
    QuickLinks && QuickLinks.data?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.MONITORING);
  const loggingQuickLink =
    QuickLinks && QuickLinks.data?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.LOGGING);

  const stageSpecName = stage.data?.spec.name;

  const tabs = usePageTabs({
    CDPipeline,
    stage,
    stages,
    pipelineRuns,
    deployPipelineRuns,
    cleanPipelineRuns,
    argoApplications,
    newPipelineRunAdded,
    setNewPipelineRunAdded,
    variablesConfigMap,
    enrichedApplicationsWithItsImageStreams: enrichedApplications,
  });

  const backRoute = Router.createRouteURL(routeCDPipelineDetails.path, {
    name: CDPipelineName,
    namespace,
  });

  const isDataLoading =
    CDPipeline.isLoading || stages.isLoading || QuickLinks.isLoading || QuickLinksURLs.isLoading;

  const permissions = useTypedPermissions();

  const { activeTab, handleChangeTab } = useTabsContext();

  const resourceIsLoaded = !stage.isLoading && !stage.error;

  const renderPageContent = React.useCallback(() => {
    if (stage.error) {
      return <ErrorContent error={stage.error} />;
    }

    return (
      <LoadingWrapper isLoading={stage.isLoading}>
        <Tabs tabs={tabs} activeTabIdx={activeTab} handleChangeTab={handleChangeTab} />
      </LoadingWrapper>
    );
  }, [activeTab, handleChangeTab, stage.error, stage.isLoading, tabs]);

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
          label: stageSpecName || '',
        },
      ]}
      headerSlot={
        !isDataLoading && resourceIsLoaded ? (
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
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.MONITORING],
                value: SYSTEM_QUICK_LINKS.MONITORING,
              }}
              enabledText="monitoring dashboard"
              iconBase64={monitoringQuickLink?.spec?.icon}
              externalLink={LinkCreationService.monitoring.createDashboardLink({
                provider: monitoringQuickLink?.metadata?.labels?.[QUICK_LINK_LABEL_SELECTOR_TYPE],
                baseURL: QuickLinksURLs.data?.[SYSTEM_QUICK_LINKS.MONITORING],
                namespace: stage.data?.spec.namespace!,
                clusterName: stage.data?.spec.clusterName,
              })}
              QuickLinkComponent={monitoringQuickLink}
              isTextButton
            />
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.LOGGING],
                value: SYSTEM_QUICK_LINKS.LOGGING,
              }}
              enabledText="logging dashboard"
              iconBase64={loggingQuickLink?.spec?.icon}
              externalLink={LinkCreationService.logging.createDashboardLink({
                provider: loggingQuickLink?.metadata?.labels?.[QUICK_LINK_LABEL_SELECTOR_TYPE],
                baseURL: QuickLinksURLs.data?.[SYSTEM_QUICK_LINKS.LOGGING],
                namespace: stage.data?.spec.namespace!,
                clusterName: stage.data?.spec.clusterName,
              })}
              QuickLinkComponent={loggingQuickLink}
              isTextButton
            />
            <Box sx={{ ml: (t) => t.typography.pxToRem(20) }}>
              <StageActionsMenu
                data={{
                  stages: stages.data!,
                  CDPipelineData: CDPipeline.data!,
                  stage: stage.data!,
                }}
                permissions={permissions}
                backRoute={backRoute}
                variant="inline"
              />
            </Box>
          </Stack>
        ) : undefined
      }
    >
      <Section
        title={stage.data?.spec.name}
        enableCopyTitle
        description={
          <>
            Manage, deploy, test, and troubleshoot your applications across distinct Environments.{' '}
            <LearnMoreLink url={EDP_USER_GUIDE.CD_PIPELINE_MANAGE.url} />
          </>
        }
      >
        {renderPageContent()}
      </Section>
    </PageWrapper>
  );
};
