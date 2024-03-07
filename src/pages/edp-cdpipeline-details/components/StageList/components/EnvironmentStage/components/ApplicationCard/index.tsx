import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { LoadingWrapper } from '../../../../../../../../components/LoadingWrapper';
import { QuickLink } from '../../../../../../../../components/QuickLink';
import { StatusIcon } from '../../../../../../../../components/StatusIcon';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../../../../k8s/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../../../../../k8s/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/Application/types';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../../../../../k8s/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../../../../../../k8s/QuickLink/hooks/useQuickLinksURLQuery';
import { useDialogContext } from '../../../../../../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../../../../../../services/link-creation';
import { PODS_LOG_VIEWER_DIALOG_NAME } from '../../../../../../../../widgets/PodsLogViewer/constants';
import { PODS_TERMINAL_DIALOG_NAME } from '../../../../../../../../widgets/PodsTerminal/constants';
import { routeEDPComponentDetails } from '../../../../../../../edp-component-details/route';
import { routeEDPArgoCDIntegration } from '../../../../../../../edp-configuration/pages/edp-argocd-integration/route';
import { StyledChip } from '../../styles';
import { StyledCard } from './styles';
import { ApplicationCardProps } from './types';

const formatDate = (date: string): string => {
  const formattedDate: string = moment(date).format('MM/DD/YYYY HH:mm:ss');
  const timeAgo: string = moment(date).fromNow();
  return `${formattedDate} (${timeAgo})`;
};

export const ApplicationCard = ({ stage, application, argoApplication }: ApplicationCardProps) => {
  const theme = useTheme();

  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(stage.metadata.namespace);

  const argoAppHealthStatus = argoApplication?.status?.health?.status;

  const [argoAppHealthStatusIcon, argoAppHealthStatusColor, argoAppHealthStatusIconRotating] =
    ApplicationKubeObject.getHealthStatusIcon(argoAppHealthStatus);

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

  return (
    <LoadingWrapper isLoading={!argoApplication?.status?.health}>
      <StyledCard variant="outlined">
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
              <StatusIcon
                Title={`Health status: ${argoAppHealthStatus || 'Unknown'}`}
                icon={argoAppHealthStatusIcon}
                color={argoAppHealthStatusColor}
                isRotating={argoAppHealthStatusIconRotating}
              />
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
                    color={theme.palette.primary.main}
                    fontWeight={500}
                  >
                    {application.metadata.name}
                  </Typography>
                </Tooltip>
              </Link>
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
                    routeName: routeEDPArgoCDIntegration.path,
                  }}
                  variant="icon"
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="caption" color="primary.dark">
              Created:
            </Typography>
            <StyledChip label={formatDate(argoApplication.metadata.creationTimestamp)} />
          </Stack>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <Button
              variant="text"
              sx={{ color: theme.palette.secondary.dark }}
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
              endIcon={<Icon icon={'mdi:file-document-box-outline'} width={18} height={18} />}
            >
              logs
            </Button>
            <Button
              variant="text"
              sx={{ color: theme.palette.secondary.dark }}
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
              endIcon={<Icon icon={'material-symbols:terminal'} width={18} height={18} />}
            >
              terminal
            </Button>
          </Stack>
        </Stack>
      </StyledCard>
    </LoadingWrapper>
  );
};
