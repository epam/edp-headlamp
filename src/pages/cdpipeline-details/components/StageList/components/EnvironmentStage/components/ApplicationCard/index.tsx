import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { ConditionalWrapper } from '../../../../../../../../components/ConditionalWrapper';
import { QuickLink } from '../../../../../../../../components/QuickLink';
import { StatusIcon } from '../../../../../../../../components/StatusIcon';
import { TextWithTooltip } from '../../../../../../../../components/TextWithTooltip';
import { TooltipWithLinkList } from '../../../../../../../../components/TooltipWithLinkList';
import { DEFAULT_CLUSTER } from '../../../../../../../../constants/clusters';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../../../../k8s/groups/ArgoCD/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/groups/ArgoCD/Application/types';
import { PodKubeObject } from '../../../../../../../../k8s/groups/default/Pod';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../../../../../k8s/groups/EDP/QuickLink/constants';
import { useDialogContext } from '../../../../../../../../providers/Dialog/hooks';
import { VIEW_MODES } from '../../../../../../../../providers/ViewMode/types';
import { LinkCreationService } from '../../../../../../../../services/link-creation';
import { PodsLogViewerDialog } from '../../../../../../../../widgets/dialogs/PodsLogViewer';
import { PodsTerminalDialog } from '../../../../../../../../widgets/dialogs/PodsTerminal';
import { routeComponentDetails } from '../../../../../../../component-details/route';
import { routeArgoCD } from '../../../../../../../configuration/pages/argocd/route';
import { StyledChip } from '../../styles';
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
  stagePods,
  viewMode,
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
        argoApplication?.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_PIPELINE],
        argoApplication?.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_STAGE],
        argoApplication?.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_APP_NAME]
      ),
    [QuickLinksURLS]
  );

  const isExternalCluster = stage.spec.clusterName !== DEFAULT_CLUSTER;

  const applicationPods = React.useMemo(() => {
    if (!stagePods || !stagePods.length || !argoApplication) {
      return [];
    }
    return stagePods.reduce((acc, pod) => {
      if (
        pod.metadata?.labels?.['app.kubernetes.io/instance'] ===
        argoApplication.metadata?.labels?.[APPLICATION_LABEL_SELECTOR_APP_NAME]
      ) {
        //@ts-ignore
        acc.push(new PodKubeObject(pod));
      }
      return acc;
    }, []);
  }, [argoApplication, stagePods]);

  const podButtonDisabled = React.useMemo(() => {
    if (!argoApplication) {
      return {
        status: true,
        reason: 'Could not find ArgoCD Application for this application',
      };
    }

    if (!applicationPods || !applicationPods.length) {
      return {
        status: true,
        reason: 'Could not find Pods for this application',
      };
    }

    return {
      status: false,
    };
  }, [argoApplication, applicationPods]);

  const [expanded, setExpanded] = React.useState<string | false>(() =>
    viewMode === VIEW_MODES.DETAILED ? 'panel1' : false
  );

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    setExpanded(viewMode === VIEW_MODES.DETAILED ? 'panel1' : false);
  }, [viewMode]);

  //@ts-ignore
  const argoAppExternalURLs = argoApplication?.status?.summary?.externalURLs;

  return (
    <Accordion
      key={viewMode}
      defaultExpanded={viewMode === VIEW_MODES.DETAILED}
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
    >
      <AccordionSummary
        expandIcon={
          viewMode === VIEW_MODES.COMPACT ? (
            <Icon icon={ICONS.ARROW_DOWN} width={20} height={20} />
          ) : null
        }
        sx={{
          padding: (t) => `${t.typography.pxToRem(8)} ${t.typography.pxToRem(24)}`,
          minHeight: 'auto !important',
          cursor: viewMode === VIEW_MODES.COMPACT ? 'pointer' : 'default',

          '& .MuiAccordionSummary-content': {
            minWidth: 0,
            margin: 0,
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ minWidth: 0, width: '100%', pr: theme.typography.pxToRem(16) }}
          justifyContent="space-between"
        >
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
              <TextWithTooltip
                text={application.metadata.name}
                textSX={{
                  fontSize: theme.typography.pxToRem(16),
                }}
              />
            </Link>
          </Stack>
          <TextWithTooltip
            text={argoApplication?.spec.source?.targetRevision ?? 'Unknown'}
            textSX={{
              fontSize: theme.typography.pxToRem(12),
              fontWeight: 300,
            }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
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
          <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="caption" color="primary.dark">
                Created:
              </Typography>
              <StyledChip
                label={
                  argoApplication
                    ? formatDate(argoApplication?.metadata.creationTimestamp)
                    : 'Unknown'
                }
              />
            </Stack>
            {argoAppExternalURLs && <TooltipWithLinkList urls={argoAppExternalURLs} size="small" />}
          </Stack>

          {!isExternalCluster && (
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
              <ConditionalWrapper
                condition={podButtonDisabled.status}
                wrapper={(children) => (
                  <Tooltip title={podButtonDisabled.reason}>
                    <div>{children}</div>
                  </Tooltip>
                )}
              >
                <Button
                  variant="text"
                  sx={{ color: theme.palette.secondary.dark }}
                  onClick={() =>
                    setDialog(PodsLogViewerDialog, {
                      pods: applicationPods,
                    })
                  }
                  disabled={podButtonDisabled.status}
                  endIcon={<Icon icon={'mdi:file-document-box-outline'} width={18} height={18} />}
                >
                  logs
                </Button>
              </ConditionalWrapper>
              <ConditionalWrapper
                condition={podButtonDisabled.status}
                wrapper={(children) => (
                  <Tooltip title={podButtonDisabled.reason}>
                    <div>{children}</div>
                  </Tooltip>
                )}
              >
                <Button
                  variant="text"
                  sx={{ color: theme.palette.secondary.dark }}
                  onClick={() =>
                    setDialog(PodsTerminalDialog, {
                      pods: applicationPods,
                    })
                  }
                  disabled={podButtonDisabled.status}
                  endIcon={<Icon icon={'material-symbols:terminal'} width={18} height={18} />}
                >
                  terminal
                </Button>
              </ConditionalWrapper>
            </Stack>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
