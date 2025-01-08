import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { QuickLink } from '../../../../../../components/QuickLink';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../../k8s/groups/ArgoCD/Application';
import { PodKubeObject } from '../../../../../../k8s/groups/default/Pod';
import { PodKubeObjectInterface } from '../../../../../../k8s/groups/default/Pod/types';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../../../k8s/groups/EDP/QuickLink/constants';
import { QUICK_LINK_LABEL_SELECTOR_TYPE } from '../../../../../../k8s/groups/EDP/QuickLink/labels';
import { StageKubeObject } from '../../../../../../k8s/groups/EDP/Stage';
import { LinkCreationService } from '../../../../../../services/link-creation';
import { routeArgoCD } from '../../../../../configuration/pages/argocd/route';
import { routeStageDetails } from '../../../../../stage-details/route';
import { usePageFilterContext } from '../../../../hooks/usePageFilterContext';
import { ApplicationCard } from './components/ApplicationCard';
import { StyledCardBody, StyledCardHeader, StyledCardWrapper, StyledChip } from './styles';
import { EnvironmentStageProps } from './types';

export const EnvironmentStage = ({
  stageWithApplicationsData: { stage, applications },
  CDPipeline,
  QuickLinksURLS,
  QuickLinks,
  viewMode,
}: EnvironmentStageProps) => {
  const theme = useTheme();

  const monitoringQuickLink =
    QuickLinks && QuickLinks?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.MONITORING);
  const loggingQuickLink =
    QuickLinks && QuickLinks?.find((el) => el.metadata.name === SYSTEM_QUICK_LINKS.LOGGING);

  const stageIsLoaded = stage?.status;

  const stageStatus = stage?.status?.status;

  const [, stageStatusColor] = StageKubeObject.getStatusIcon(stageStatus);

  const { filter } = usePageFilterContext();

  const filteredApplications = React.useMemo(() => {
    const applicationValues = filter.values.application;
    const healthValue = filter.values.health;

    let _applications = [...applications];

    if (applicationValues && Array.isArray(applicationValues)) {
      _applications = _applications.filter((el) =>
        applicationValues.length === 0
          ? true
          : applicationValues.includes(el.application.metadata.name)
      );
    }

    if (healthValue) {
      _applications = _applications.filter(
        (el) =>
          ApplicationKubeObject.parseStatus(el.argoApplication) === healthValue ||
          healthValue === 'All'
      );
    }

    return _applications;
  }, [applications, filter]);

  const [stagePods, setStagePods] = React.useState<PodKubeObjectInterface[]>(null);

  React.useEffect(() => {
    if (!stage) {
      return;
    }

    const cancelStream = PodKubeObject.streamList({
      namespace: stage.spec.namespace,
      dataHandler: (newData) => {
        setStagePods(newData);
      },
      errorHandler: (error) => console.error(error),
    });

    return () => {
      cancelStream();
    };
  }, [stage]);

  return (
    <StyledCardWrapper>
      <LoadingWrapper isLoading={!stageIsLoaded}>
        <Stack spacing={2}>
          <StyledCardHeader stageStatusColor={stageStatusColor} variant="outlined">
            <Stack spacing={1}>
              <Stack spacing={2} justifyContent="space-between" direction="row">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Link
                    routeName={routeStageDetails.path}
                    params={{
                      CDPipelineName: CDPipeline.metadata.name,
                      namespace: stage.metadata.namespace,
                      stageName: stage.metadata.name,
                    }}
                  >
                    <Typography
                      fontSize={theme.typography.pxToRem(20)}
                      fontWeight={500}
                      color={theme.palette.primary.main}
                    >
                      {stage.spec.name.toUpperCase()}
                    </Typography>
                  </Link>{' '}
                  <Typography variant="caption" color="secondary.dark">
                    ({stage.spec.clusterName})
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="primary.dark">
                    Open In:
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <QuickLink
                      name={{
                        label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.ARGOCD],
                        value: SYSTEM_QUICK_LINKS.ARGOCD,
                      }}
                      icon={ICONS.ARGOCD}
                      externalLink={LinkCreationService.argocd.createStageLink(
                        QuickLinksURLS?.[SYSTEM_QUICK_LINKS.ARGOCD],
                        CDPipeline?.metadata?.name,
                        stage.spec.name
                      )}
                      configurationLink={{
                        routeName: routeArgoCD.path,
                      }}
                      size="small"
                    />
                    <QuickLink
                      name={{
                        label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.MONITORING],
                        value: SYSTEM_QUICK_LINKS.MONITORING,
                      }}
                      icon={ICONS.GRAFANA}
                      iconBase64={monitoringQuickLink?.spec?.icon}
                      enabledText="Open Metrics"
                      externalLink={LinkCreationService.monitoring.createDashboardLink({
                        provider:
                          monitoringQuickLink?.metadata?.labels[QUICK_LINK_LABEL_SELECTOR_TYPE],
                        baseURL: QuickLinksURLS?.[SYSTEM_QUICK_LINKS.MONITORING],
                        namespace: stage.spec.namespace,
                        clusterName: stage.spec.clusterName,
                      })}
                      QuickLinkComponent={monitoringQuickLink}
                      size="small"
                    />
                    <QuickLink
                      name={{
                        label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.LOGGING],
                        value: SYSTEM_QUICK_LINKS.LOGGING,
                      }}
                      icon={ICONS.OPENSEARCH}
                      iconBase64={loggingQuickLink?.spec?.icon}
                      enabledText="Open Logs"
                      externalLink={LinkCreationService.logging.createDashboardLink({
                        provider:
                          loggingQuickLink?.metadata?.labels[QUICK_LINK_LABEL_SELECTOR_TYPE],
                        baseURL: QuickLinksURLS?.[SYSTEM_QUICK_LINKS.LOGGING],
                        namespace: stage.spec.namespace,
                        clusterName: stage.spec.clusterName,
                      })}
                      QuickLinkComponent={loggingQuickLink}
                      size="small"
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Stack spacing={1} direction="row">
                  <Typography variant="caption" color="primary.dark">
                    Namespace:
                  </Typography>
                  <StyledChip label={stage.spec.namespace} />
                </Stack>
                <Stack spacing={1} direction="row">
                  <Typography variant="caption" color="primary.dark">
                    Trigger Type:
                  </Typography>
                  <StyledChip label={stage.spec.triggerType} />
                </Stack>
              </Stack>
            </Stack>
          </StyledCardHeader>

          <StyledCardBody>
            <Stack spacing={2}>
              {filteredApplications.map((el) => {
                const key = el.argoApplication?.metadata.name;

                return el.argoApplication ? (
                  <ApplicationCard
                    key={key}
                    stage={stage}
                    application={el.application}
                    argoApplication={el.argoApplication}
                    QuickLinksURLS={QuickLinksURLS}
                    stagePods={stagePods}
                    viewMode={viewMode}
                  />
                ) : null;
              })}
            </Stack>
          </StyledCardBody>
        </Stack>
      </LoadingWrapper>
    </StyledCardWrapper>
  );
};
