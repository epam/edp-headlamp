import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PageWrapper } from '../../components/PageWrapper';
import { QuickLink } from '../../components/QuickLink';
import { Section } from '../../components/Section';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { SYSTEM_QUICK_LINKS, SYSTEM_QUICK_LINKS_LABELS } from '../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { LinkCreationService } from '../../services/link-creation';
import { CDPipelineActionsMenu } from '../../widgets/CDPipelineActionsMenu';
import { routeEDPCDPipelineList } from '../edp-cdpipeline-list/route';
import { routeEDPSonarIntegration } from '../edp-configuration/pages/edp-sonar-integration/route';
import { StageList } from './components/StageList';
import { StageListFilter } from './components/StageListFilter';
import { useDynamicDataContext } from './providers/DynamicData/hooks';
import { EDPCDPipelineRouteParams } from './types';

export const PageView = () => {
  const theme = useTheme();
  const { name, namespace } = useParams<EDPCDPipelineRouteParams>();

  const { CDPipeline } = useDynamicDataContext();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);

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
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <QuickLink
              name={{
                label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.ARGOCD],
                value: SYSTEM_QUICK_LINKS.ARGOCD,
              }}
              icon={ICONS.ARGOCD}
              externalLink={LinkCreationService.argocd.createPipelineLink(
                QuickLinksURLS?.[SYSTEM_QUICK_LINKS.ARGOCD],
                name
              )}
              configurationLink={{
                routeName: routeEDPSonarIntegration.path,
              }}
              variant="text"
            />
          </Grid>
          {!CDPipeline.isLoading && (
            <>
              <Grid item>
                <CDPipelineActionsMenu
                  data={{
                    CDPipelineData: CDPipeline.data,
                  }}
                  backRoute={Router.createRouteURL(routeEDPCDPipelineList.path)}
                  variant="inline"
                />
              </Grid>
            </>
          )}
        </Grid>
      }
    >
      <Section
        title={<Typography fontSize={theme.typography.pxToRem(48)}>{name}</Typography>}
        description={'Inspect the Environment and operate stages.'}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <StageListFilter />
          </Grid>
          <Grid item xs={12} sx={{ pr: '2px' }}>
            <StageList />
          </Grid>
        </Grid>
      </Section>
    </PageWrapper>
  );
};
