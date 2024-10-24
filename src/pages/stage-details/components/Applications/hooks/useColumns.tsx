import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Box,
  Grid,
  IconButton,
  Link as MuiLink,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ResourceIconLink } from '../../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { TableColumn } from '../../../../../components/Table/types';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../../configs/codebase-mappings';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
import { GIT_PROVIDERS } from '../../../../../constants/gitProviders';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../k8s/groups/ArgoCD/Application';
import {
  APPLICATION_LABEL_SELECTOR_APP_NAME,
  APPLICATION_LABEL_SELECTOR_PIPELINE,
  APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../../k8s/groups/ArgoCD/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../../k8s/groups/ArgoCD/Application/types';
import { getDeployedVersion } from '../../../../../k8s/groups/ArgoCD/Application/utils/getDeployedVersion';
import {
  SYSTEM_QUICK_LINKS,
  SYSTEM_QUICK_LINKS_LABELS,
} from '../../../../../k8s/groups/EDP/QuickLink/constants';
import { useQuickLinksURLsQuery } from '../../../../../k8s/groups/EDP/QuickLink/hooks/useQuickLinksURLQuery';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../../../services/link-creation';
import { PodsLogViewerDialog } from '../../../../../widgets/dialogs/PodsLogViewer';
import { routeComponentDetails } from '../../../../component-details/route';
import { APPLICATIONS_TABLE_MODE } from '../../../constants';
import { useDataContext } from '../../../providers/Data/hooks';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams, EnrichedApplicationWithArgoApplication } from '../../../types';
import { ImageStreamTagsSelect } from '../components/ImageStreamTagsSelect';
import { ValuesOverrideSwitch } from '../components/ValuesOverrideSwitch';
import { ApplicationsTableMode } from '../types';

export const useColumns = ({
  mode,
}: {
  mode: ApplicationsTableMode;
}): TableColumn<EnrichedApplicationWithArgoApplication>[] => {
  const theme = useTheme();
  const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
  const { data: QuickLinksURLS } = useQuickLinksURLsQuery(namespace);
  const { gitOpsCodebase } = useDataContext();
  const {
    stage: { data: stage, isLoading: isStageLoading },
    gitServers: { data: gitServers, isLoading: isGitServersLoading },
    applicationPodsMap: { data: applicationPodsMap },
  } = useDynamicDataContext();
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

  const gitOpsGitServer = React.useMemo(() => {
    if (isGitServersLoading || gitOpsCodebase === null) {
      return null;
    }

    return gitServers?.find(
      (gitServer) => gitServer.metadata.name === gitOpsCodebase.data?.spec.gitServer
    );
  }, [gitOpsCodebase, gitServers, isGitServersLoading]);

  const isLoading = gitOpsCodebase === null || isStageLoading;
  const isDefaultCluster = stage?.spec.clusterName === DEFAULT_CLUSTER;

  const { setDialog } = useDialogContext();

  return React.useMemo(() => {
    if (isLoading) {
      return [];
    }

    const healthColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: 'health',
      label: 'Health',
      render: ({ argoApplication }) => {
        const health = argoApplication?.status?.health?.status;

        const [icon, color, isRotating] = ApplicationKubeObject.getHealthStatusIcon(health);

        return (
          <StatusIcon
            Title={`Health status: ${health || 'Unknown'}`}
            icon={icon}
            color={color}
            isRotating={isRotating}
          />
        );
      },
      width: '5%',
      textAlign: 'center',
    };

    const syncColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: 'sync',
      label: 'Sync',
      render: ({ argoApplication }) => {
        const sync = argoApplication?.status?.sync?.status;

        const [icon, color, isRotating] = ApplicationKubeObject.getSyncStatusIcon(sync);

        return (
          <StatusIcon
            Title={`Sync status: ${sync || 'Unknown'}`}
            icon={icon}
            color={color}
            isRotating={isRotating}
          />
        );
      },
      width: '5%',
      textAlign: 'center',
    };

    const applicationColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: 'application',
      label: 'Application',
      render: ({
        application: {
          metadata: { name, namespace },
        },
      }) => {
        return (
          <Link
            routeName={routeComponentDetails.path}
            params={{
              name,
              namespace,
            }}
          >
            {name}
          </Link>
        );
      },
      width: '25%',
    };

    const valuesOverrideColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: 'valuesOverride',
      label: (
        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
          <Grid item>Values override</Grid>
          <Grid item>
            <Tooltip title={'Override default deployment settings with custom configurations.'}>
              <Icon icon={ICONS.INFO_CIRCLE} width={20} />
            </Tooltip>
          </Grid>
        </Grid>
      ),
      render: (enrichedApplicationWithArgoApplication) => {
        const {
          application: {
            metadata: { name: appName },
          },
        } = enrichedApplicationWithArgoApplication;

        return (
          <Stack direction="row" alignItems="center">
            <ValuesOverrideSwitch
              enrichedApplicationWithArgoApplication={enrichedApplicationWithArgoApplication}
              mode={mode}
            />
            <ResourceIconLink
              tooltipTitle={'Go to the Source Code'}
              link={LinkCreationService.git.createGitOpsValuesYamlFileLink(
                gitOpsCodebase.data?.status.gitWebUrl,
                CDPipelineName,
                stage?.spec.name,
                appName,
                gitOpsGitServer?.spec.gitProvider as GIT_PROVIDERS
              )}
              icon={ICONS.NEW_WINDOW}
              name="source code"
            />
          </Stack>
        );
      },
      width: '15%',
    };

    const podsColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: 'pods',
      label: 'Pods',
      render: (enrichedApplicationWithArgoApplication) => {
        const appName = enrichedApplicationWithArgoApplication?.application?.metadata.name;
        const appPods = applicationPodsMap?.[appName];
        const disabled = (() => {
          if (!enrichedApplicationWithArgoApplication?.argoApplication) {
            return {
              status: true,
              reason: 'Could not find ArgoCD Application for this application',
            };
          }

          if (!appPods) {
            return {
              status: true,
              reason: 'Could not find Pods for this application',
            };
          }

          return {
            status: false,
          };
        })();

        const buttonIconColor = disabled.status
          ? theme.palette.action.disabled
          : theme.palette.text.primary;

        return (
          <Stack direction="row" spacing={1} alignItems={'center'} justifyContent="center">
            <Tooltip title={disabled.status ? disabled.reason : 'Show Logs'}>
              <div>
                <IconButton
                  onClick={() =>
                    setDialog(PodsLogViewerDialog, {
                      pods: appPods,
                    })
                  }
                  disabled={disabled.status}
                  size="large"
                >
                  <Icon icon="ph:file-text-bold" color={buttonIconColor} width={20} height={20} />
                </IconButton>
              </div>
            </Tooltip>
            <Tooltip title={disabled.status ? disabled.reason : 'Show Terminal'}>
              <div>
                <IconButton
                  onClick={() =>
                    setDialog(PodsLogViewerDialog, {
                      pods: appPods,
                    })
                  }
                  disabled={disabled.status}
                  size="large"
                >
                  <Icon icon="mdi:console" color={buttonIconColor} width={20} height={20} />
                </IconButton>
              </div>
            </Tooltip>
          </Stack>
        );
      },
      textAlign: 'center',
      width: '10%',
    };

    const ingressColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: 'ingress',
      label: (
        <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
          <Grid item>Ingress</Grid>
          <Grid item>
            <Tooltip
              title={
                'The Ingress endpoint directs you to the deployed application. To view the link, ensure your application is deployed with an Ingress resource.'
              }
            >
              <Icon icon={ICONS.INFO_CIRCLE} width={20} />
            </Tooltip>
          </Grid>
        </Grid>
      ),
      render: (enrichedApplicationWithArgoApplication) => {
        const externalURLs =
          // @ts-ignore
          enrichedApplicationWithArgoApplication?.argoApplication?.status?.summary?.externalURLs;

        if (!externalURLs) {
          return null;
        }

        return (
          <Tooltip
            title={
              <Paper elevation={8}>
                <MenuList>
                  {externalURLs.map((el) => (
                    <MenuItem
                      key={el}
                      component={MuiLink}
                      href={el}
                      target={'_blank'}
                      sx={{ whiteSpace: 'normal', wordBreak: 'break-all' }}
                    >
                      {el}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            }
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': { p: '0 !important' },
              },
              placement: 'top-end',
            }}
          >
            <Box sx={{ lineHeight: 0, mx: (t) => t.typography.pxToRem(32) }}>
              <Icon icon={ICONS.NEW_WINDOW} width={20} height={20} />
            </Box>
          </Tooltip>
        );
      },
      textAlign: 'right',
    };

    return mode === APPLICATIONS_TABLE_MODE.PREVIEW
      ? ([
          healthColumn,
          syncColumn,
          applicationColumn,
          {
            id: 'deployedVersion',
            label: 'Deployed version',
            render: ({
              argoApplication,
              application: {
                spec: { lang, framework, buildTool },
              },
            }) => {
              const isHelm =
                lang === CODEBASE_COMMON_LANGUAGES.HELM &&
                framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
                buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

              const withValuesOverride = argoApplication
                ? Object.hasOwn(argoApplication?.spec, 'sources')
                : false;

              const deployedVersion = getDeployedVersion(
                withValuesOverride,
                isHelm,
                argoApplication
              );

              return argoApplication && deployedVersion !== 'NaN' ? (
                <Tooltip
                  title={
                    <Grid container alignItems={'center'} spacing={1}>
                      <Grid item>
                        Open in {SYSTEM_QUICK_LINKS_LABELS[SYSTEM_QUICK_LINKS.ARGOCD]}
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
                  <Box sx={{ m: '2px 0' }}>
                    <MuiLink href={_createArgoCDLink(argoApplication)} target={'_blank'}>
                      {deployedVersion}
                    </MuiLink>
                  </Box>
                </Tooltip>
              ) : (
                'No deploy'
              );
            },
            width: '25%',
          },
          valuesOverrideColumn,
          ...(isDefaultCluster
            ? ([podsColumn] as TableColumn<EnrichedApplicationWithArgoApplication>[])
            : []),
          ingressColumn,
        ] as TableColumn<EnrichedApplicationWithArgoApplication>[])
      : ([
          {
            id: 'empty',
            label: '',
            render: () => <Box sx={{ width: '48px' }} />,
            width: '64',
          },
          healthColumn,
          syncColumn,
          applicationColumn,
          {
            id: 'imageStreamVersion',
            label: (
              <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                <Grid item>Deployed version</Grid>
                <Grid item>
                  <Tooltip
                    title={
                      <>
                        <Typography variant="body2">
                          Choose the application image version to deploy.
                        </Typography>
                        <Typography component="div" variant="body2">
                          This field is enabled after a successful build and promotion through
                          previous Environments, if any.
                        </Typography>
                      </>
                    }
                    sx={{ lineHeight: 1 }}
                  >
                    <Icon icon={ICONS.INFO_CIRCLE} width={20} />
                  </Tooltip>
                </Grid>
              </Grid>
            ),
            render: (enrichedApplicationWithArgoApplication) => {
              return (
                <ImageStreamTagsSelect
                  enrichedApplicationWithArgoApplication={enrichedApplicationWithArgoApplication}
                />
              );
            },
            width: '25%',
          },
          valuesOverrideColumn,
          ...(isDefaultCluster
            ? ([podsColumn] as TableColumn<EnrichedApplicationWithArgoApplication>[])
            : []),
          ingressColumn,
        ] as TableColumn<EnrichedApplicationWithArgoApplication>[]);
  }, [
    CDPipelineName,
    _createArgoCDLink,
    applicationPodsMap,
    gitOpsCodebase.data?.status.gitWebUrl,
    gitOpsGitServer?.spec.gitProvider,
    isDefaultCluster,
    isLoading,
    mode,
    setDialog,
    stage?.spec.name,
    theme.palette.action.disabled,
    theme.palette.grey,
    theme.palette.text.primary,
  ]);
};
