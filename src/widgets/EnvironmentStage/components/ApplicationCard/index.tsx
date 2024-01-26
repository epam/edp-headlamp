import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { LoadingWrapper } from '../../../../components/LoadingWrapper';
import { StatusIcon } from '../../../../components/StatusIcon';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../k8s/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../k8s/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import {
  SYSTEM_EDP_COMPONENTS,
  SYSTEM_EDP_COMPONENTS_LABELS,
} from '../../../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { routeEDPComponentDetails } from '../../../../pages/edp-component-details/route';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../../services/link-creation';
import { PODS_LOG_VIEWER_DIALOG_NAME } from '../../../PodsLogViewer/constants';
import { PODS_TERMINAL_DIALOG_NAME } from '../../../PodsTerminal/constants';
import { StyledCard, StyledVersionChip } from './styles';
import { ApplicationCardProps } from './types';

const formatDate = (date: string): string => {
  const formattedDate: string = moment(date).format('MM/DD/YYYY HH:mm:ss');
  const timeAgo: string = moment(date).fromNow();
  return `${formattedDate} (${timeAgo})`;
};

export const ApplicationCard = ({ stage, application, argoApplication }: ApplicationCardProps) => {
  const theme = useTheme();

  const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(stage.metadata.namespace);

  const argoAppHealthStatus = argoApplication?.status?.health?.status;
  const argpAppSyncStatus = argoApplication?.status?.sync?.status;

  const [argoAppHealthStatusIcon, argoAppHealthStatusColor, argoAppHealthStatusIconRotating] =
    ApplicationKubeObject.getHealthStatusIcon(argoAppHealthStatus);
  const [argoAppSyncStatusIcon, argoAppSyncStatusColor, argoAppSyncStatusRotating] =
    ApplicationKubeObject.getSyncStatusIcon(argpAppSyncStatus);

  const { setDialog } = useDialogContext();

  const _createArgoCDLink = React.useCallback(
    (argoApplication: ApplicationKubeObjectInterface) =>
      LinkCreationService.argocd.createApplicationLink(
        EDPComponentsURLS?.[SYSTEM_EDP_COMPONENTS.ARGOCD],
        argoApplication.metadata.labels[APPLICATION_LABEL_SELECTOR_PIPELINE],
        argoApplication.metadata.labels[APPLICATION_LABEL_SELECTOR_STAGE],
        argoApplication.metadata.labels[APPLICATION_LABEL_SELECTOR_APP_NAME]
      ),
    [EDPComponentsURLS]
  );

  return (
    <LoadingWrapper isLoading={!argoApplication?.status?.health}>
      <StyledCard variant="outlined" argoAppHealthStatusColor={argoAppHealthStatusColor}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item sx={{ flexShrink: 0, mt: theme.typography.pxToRem(5) }}>
            <Stack spacing={3} sx={{ mt: theme.typography.pxToRem(4) }}>
              <StatusIcon
                Title={`Health status: ${argoAppHealthStatus || 'Unknown'}`}
                icon={argoAppHealthStatusIcon}
                color={argoAppHealthStatusColor}
                isRotating={argoAppHealthStatusIconRotating}
              />
              <StatusIcon
                Title={`Sync status: ${argpAppSyncStatus || 'Unknown'}`}
                icon={argoAppSyncStatusIcon}
                color={argoAppSyncStatusColor}
                isRotating={argoAppSyncStatusRotating}
              />
            </Stack>
          </Grid>
          <Grid item sx={{ flexGrow: 1, mt: theme.typography.pxToRem(10), minWidth: 0 }}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Link
                  routeName={routeEDPComponentDetails.path}
                  params={{
                    name: application.metadata.name,
                    namespace: application.metadata.namespace,
                  }}
                  sx={{ minWidth: 0 }}
                >
                  <Tooltip title={application.metadata.name}>
                    <Typography
                      variant="body1"
                      sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {application.metadata.name}
                    </Typography>
                  </Tooltip>
                </Link>
                <StyledVersionChip
                  size="small"
                  label={argoApplication.spec.source.targetRevision}
                  variant="outlined"
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ pt: theme.typography.pxToRem(2) }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Icon icon={ICONS.ARGOCD} width={18} />
                  <Typography variant="body2"> App</Typography>
                </Stack>
                <Tooltip
                  title={
                    <Grid container alignItems={'center'} spacing={1}>
                      <Grid item>
                        Open in {SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.ARGOCD]}
                      </Grid>
                      <span> </span>
                      <Grid item>
                        <Icon
                          icon={ICONS.NEW_WINDOW}
                          color={theme.palette.grey['500']}
                          width="15"
                        />
                      </Grid>
                    </Grid>
                  }
                >
                  <MuiLink
                    href={_createArgoCDLink(argoApplication)}
                    target={'_blank'}
                    sx={{ minWidth: 0 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {argoApplication.metadata.name}
                    </Typography>
                  </MuiLink>
                </Tooltip>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Typography
                  variant="caption"
                  sx={{ height: `${+theme.typography.caption.lineHeight * 2}em` }}
                  component="div"
                >
                  Created At: {formatDate(argoApplication.metadata.creationTimestamp)}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item sx={{ flexShrink: 0 }}>
            <Stack spacing={2} sx={{ mt: theme.typography.pxToRem(4), alignItems: 'center' }}>
              <Tooltip title={'Show Logs'}>
                <IconButton
                  onClick={() =>
                    setDialog({
                      modalName: PODS_LOG_VIEWER_DIALOG_NAME,
                      forwardedProps: {
                        stageNamespace: stage.spec.namespace,
                        appName: application.metadata.name,
                      },
                    })
                  }
                  disabled={!argoApplication}
                  size="medium"
                >
                  <Icon icon="mdi:file-document-box-outline" width="18" height="18" />
                </IconButton>
              </Tooltip>
              <Tooltip title={'Show Terminal'}>
                <IconButton
                  onClick={() =>
                    setDialog({
                      modalName: PODS_TERMINAL_DIALOG_NAME,
                      forwardedProps: {
                        stageNamespace: stage.spec.namespace,
                        appName: application.metadata.name,
                      },
                    })
                  }
                  disabled={!argoApplication}
                  size="medium"
                >
                  <Icon icon="mdi:console" width="18" height="18" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </StyledCard>
    </LoadingWrapper>
  );
};
