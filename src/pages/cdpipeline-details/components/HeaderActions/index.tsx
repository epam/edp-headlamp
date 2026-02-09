import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { QuickLink } from '../../../../components/QuickLink';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../k8s/groups/EDP/QuickLink/constants';
import { LinkCreationService } from '../../../../services/link-creation';
import { CDPipelineActionsMenu } from '../../../../widgets/CDPipelineActionsMenu';
import { routeCDPipelineList } from '../../../cdpipeline-list/route';
import { routeSonar } from '../../../configuration/pages/sonar/route';
import { useTypedPermissions } from '../../hooks/useTypedPermissions';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { CDPipelineRouteParams } from '../../types';

export const HeaderActions = () => {
  const { name } = useParams<CDPipelineRouteParams>();

  const { CDPipeline, quickLinksURLs } = useDynamicDataContext();

  const permissions = useTypedPermissions();

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <QuickLink
          name={{
            label: SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.ARGOCD],
            value: SYSTEM_QUICK_LINKS.ARGOCD,
          }}
          icon={ICONS.ARGOCD}
          externalLink={LinkCreationService.argocd.createPipelineLink(
            quickLinksURLs.data?.[SYSTEM_QUICK_LINKS.ARGOCD],
            name
          )}
          configurationLink={{
            routeName: routeSonar.path,
          }}
          isTextButton
        />
      </Grid>
      <>
        <Grid item>
          <LoadingWrapper isLoading={CDPipeline.isLoading}>
            <CDPipelineActionsMenu
              data={{
                CDPipelineData: CDPipeline.data!,
              }}
              permissions={permissions}
              backRoute={Router.createRouteURL(routeCDPipelineList.path)}
              variant="inline"
            />
          </LoadingWrapper>
        </Grid>
      </>
    </Grid>
  );
};
