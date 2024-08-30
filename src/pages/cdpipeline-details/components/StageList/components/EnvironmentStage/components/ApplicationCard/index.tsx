import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { LoadingWrapper } from '../../../../../../../../components/LoadingWrapper';
import { QuickLink } from '../../../../../../../../components/QuickLink';
import { StatusIcon } from '../../../../../../../../components/StatusIcon';
import { DEFAULT_CLUSTER } from '../../../../../../../../constants/clusters';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../../../../k8s/groups/ArgoCD/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/groups/ArgoCD/Application/types';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../../../../../k8s/groups/EDP/QuickLink/constants';
import { useDialogContext } from '../../../../../../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../../../../../../services/link-creation';
import { PodsLogViewerDialog } from '../../../../../../../../widgets/dialogs/PodsLogViewer';
import { PodsTerminalDialog } from '../../../../../../../../widgets/dialogs/PodsTerminal';
import { routeComponentDetails } from '../../../../../../../component-details/route';
import { routeArgoCD } from '../../../../../../../configuration/pages/argocd/route';
import { StyledChip } from '../../styles';
import { StyledCard } from './styles';
import { ApplicationCardProps } from './types';

const formatDate = (date: string): string => {
  const formattedDate: string = moment(date).format('MM/DD/YYYY HH:mm:ss');
  const timeAgo: string = moment(date).fromNow();
  return `${formattedDate} (${timeAgo})`;
};

export const ApplicationCard = ({
  stage,
  application,
  argoApplication,
  QuickLinksURLS,
  CDPipeline,
}: ApplicationCardProps) => {
  const theme = useTheme();

  const argoAppHealthStatus = argoApplication?.status?.health?.status;
  const argoAppSyncStatus = argoApplication?.status?.sync?.status;

  const [argoAppHealthStatusIcon, argoAppHealthStatusColor, argoAppHealthStatusIconRotating] =
    ApplicationKubeObject.getHealthStatusIcon(argoAppHealthStatus);
  const [argoAppSyncStatusIcon, argoAppSyncStatusColor] =
    ApplicationKubeObject.getSyncStatusIcon(argoAppSyncStatus);

  const { setDialog } = useDialogContext();

  const _createArgoCDLink = React.useCallback(
    (argoApplication: ApplicationKubeObjectInterface) =>
      LinkCreationService.argocd.createApplicationLink(
        QuickLinksURLS?.[SYSTEM_QUICK_LINKS.ARGOCD],
        argoApplication.metadata.labels[APPLICATION_LABEL_SELECTOR_PIPELINE],
        argoApplication.metadata.labels[APPLICATION_LABEL_SELECTOR_STAGE],
        argoApplication.metadata.labels[APPLICATION_LABEL_SELECTOR_APP_NAME]
      ),
    [QuickLinksURLS]
  );

  const isExternalCluster = stage.spec.clusterName !== DEFAULT_CLUSTER;

  return (
    <LoadingWrapper isLoading={!argoApplication?.status?.health}>
      <StyledCard variant="outlined">
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
              <StatusIcon
                Title={`Health status: ${argoAppHealthStatus || 'Unknown'}`}
                icon={argoAppHealthStatusIcon}
                color={argoAppHealthStatusColor}
                isRotating={argoAppHealthStatusIconRotating}
              />
              <Link
                routeName={routeComponentDetails.path}
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
                    color={theme.palette.primary.main}
                    fontWeight={500}
                  >
                    {application.metadata.name}
                  </Typography>
                </Tooltip>
              </Link>
              <Tooltip title={argoApplication.spec.source.targetRevision}>
                <Typography
                  variant="caption"
                  color={theme.palette.secondary.dark}
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {argoApplication.spec.source.targetRevision}
                </Typography>
              </Tooltip>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexShrink={0}>
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
                  externalLink={_createArgoCDLink(argoApplication)}
                  configurationLink={{
                    routeName: routeArgoCD.path,
                  }}
                  size="small"
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="caption" color="primary.dark">
              Sync status:
            </Typography>
            <StatusIcon
              Title={`Sync status: ${argoAppSyncStatus || 'Unknown'}`}
              icon={argoAppSyncStatusIcon}
              color={argoAppSyncStatusColor}
              width={16}
            />
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="caption" color="primary.dark">
              To promote:
            </Typography>
            <Typography variant="caption" color="primary.dark">
              {CDPipeline.spec.applicationsToPromote.includes(application.metadata.name)
                ? 'True'
                : 'False'}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="caption" color="primary.dark">
              Created:
            </Typography>
            <StyledChip label={formatDate(argoApplication.metadata.creationTimestamp)} />
          </Stack>
          {!isExternalCluster && (
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
              <Button
                variant="text"
                sx={{ color: theme.palette.secondary.dark }}
                onClick={() =>
                  setDialog(PodsLogViewerDialog, {
                    stageNamespace: stage.spec.namespace,
                    appName: application.metadata.name,
                  })
                }
                disabled={!argoApplication}
                endIcon={<Icon icon={'mdi:file-document-box-outline'} width={18} height={18} />}
              >
                logs
              </Button>
              <Button
                variant="text"
                sx={{ color: theme.palette.secondary.dark }}
                onClick={() =>
                  setDialog(PodsTerminalDialog, {
                    stageNamespace: stage.spec.namespace,
                    appName: application.metadata.name,
                  })
                }
                disabled={!argoApplication}
                endIcon={<Icon icon={'material-symbols:terminal'} width={18} height={18} />}
              >
                terminal
              </Button>
            </Stack>
          )}
        </Stack>
      </StyledCard>
    </LoadingWrapper>
  );
};
