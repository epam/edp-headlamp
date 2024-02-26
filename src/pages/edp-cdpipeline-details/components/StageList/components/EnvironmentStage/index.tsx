import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { QuickLink } from '../../../../../../components/QuickLink';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../../k8s/Application';
import { EDPCDPipelineStageKubeObject } from '../../../../../../k8s/EDPCDPipelineStage';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { LinkCreationService } from '../../../../../../services/link-creation';
import { routeEDPArgoCDIntegration } from '../../../../../edp-configuration/pages/edp-argocd-integration/route';
import { routeQuickLinkDetails } from '../../../../../edp-configuration/pages/edp-quick-link-details/route';
import { routeEDPStageDetails } from '../../../../../edp-stage-details/route';
import { usePageFilterContext } from '../../../../hooks/usePageFilterContext';
import { ApplicationCard } from './components/ApplicationCard';
import { Arrow } from './components/Arrow';
import { StyledCardBody, StyledCardHeader, StyledChip } from './styles';
import { EnvironmentStageProps } from './types';

export const EnvironmentStage = ({
  stageWithApplicationsData: { stage, applications },
  CDPipeline,
}: EnvironmentStageProps) => {
  const namespace = stage.metadata.namespace;
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(stage.metadata.namespace);

  const stageIsLoaded = stage?.status;

  const stageStatus = stage?.status?.status;

  const [, stageStatusColor] = EDPCDPipelineStageKubeObject.getStatusIcon(stageStatus);

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

  return (
    <Paper elevation={1}>
      <LoadingWrapper isLoading={!stageIsLoaded}>
        <StyledCardHeader stageStatusColor={stageStatusColor} variant="outlined">
          <Grid container alignItems="center" spacing={4} wrap="nowrap">
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={`Description: ${stage.spec.description}`}>
                  <Icon icon={ICONS.INFO_CIRCLE} width={18} />
                </Tooltip>
              </Stack>
            </Grid>
            <Grid item sx={{ mr: 'auto !important' }}>
              <Grid container spacing={1} wrap="nowrap" alignItems="center">
                <Grid item sx={{ mr: 'auto !important' }}>
                  <Typography variant="h5" component="div">
                    <Link
                      routeName={routeEDPStageDetails.path}
                      params={{
                        CDPipelineName: CDPipeline.metadata.name,
                        namespace: stage.metadata.namespace,
                        stageName: stage.metadata.name,
                      }}
                    >
                      {stage.spec.name}
                    </Link>{' '}
                    <Typography variant="caption" component="div">
                      ({stage.spec.clusterName})
                    </Typography>
                  </Typography>
                </Grid>
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
                      stage.spec.name
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
                      stage.spec.namespace
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
                      stage.spec.namespace
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
                <Grid item>
                  <Tooltip title="Trigger Type">
                    <StyledChip size="small" label={stage.spec.triggerType} />
                  </Tooltip>
                </Grid>
              </Grid>
              <Typography variant="body2">Namespace: {stage.spec.namespace}</Typography>
            </Grid>
            <Grid item>
              <Arrow />
            </Grid>
          </Grid>
        </StyledCardHeader>

        <StyledCardBody>
          <Grid container spacing={4}>
            {filteredApplications.map((el) => {
              const key = el.argoApplication?.metadata.name;

              return el.argoApplication ? (
                <Grid item xs={12} key={key}>
                  <ApplicationCard
                    stage={stage}
                    application={el.application}
                    argoApplication={el.argoApplication}
                  />
                </Grid>
              ) : null;
            })}
          </Grid>
        </StyledCardBody>
      </LoadingWrapper>
    </Paper>
  );
};
