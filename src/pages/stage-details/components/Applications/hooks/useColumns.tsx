import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { ResourceIconLink } from '../../../../../components/ResourceIconLink';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { useTableSettings } from '../../../../../components/Table/components/TableSettings/hooks/useTableSettings';
import { getSyncedColumnData } from '../../../../../components/Table/components/TableSettings/utils';
import { TableColumn } from '../../../../../components/Table/types';
import { TooltipWithLinkList } from '../../../../../components/TooltipWithLinkList';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../../configs/codebase-mappings';
import { DEFAULT_CLUSTER } from '../../../../../constants/clusters';
import { GIT_PROVIDERS } from '../../../../../constants/gitProviders';
import { TABLES } from '../../../../../constants/tables';
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
import { FormSwitch } from '../../../../../providers/Form/components/FormSwitch';
import { LinkCreationService } from '../../../../../services/link-creation';
import { PodsLogViewerDialog } from '../../../../../widgets/dialogs/PodsLogViewer';
import { PodsTerminalDialog } from '../../../../../widgets/dialogs/PodsTerminal';
import { routeComponentDetails } from '../../../../component-details/route';
import { ALL_VALUES_OVERRIDE_KEY, APPLICATIONS_TABLE_MODE } from '../../../constants';
import { useDataContext } from '../../../providers/Data/hooks';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams, EnrichedApplicationWithArgoApplication } from '../../../types';
import { ImageStreamTagsSelect } from '../components/ImageStreamTagsSelect';
import { ValuesOverrideSwitch } from '../components/ValuesOverrideSwitch';
import { columnNames } from '../constants';
import { ApplicationsTableMode } from '../types';

export const useColumns = ({
  mode,
  handleClickLatest,
  handleClickOverrideValuesAll,
  handleClickStable,
  buttonsHighlighted,
}: {
  mode: ApplicationsTableMode;
  handleClickLatest: () => void;
  handleClickOverrideValuesAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickStable: () => void;
  buttonsHighlighted: Record<string, boolean>;
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

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const isPreviewMode = mode === APPLICATIONS_TABLE_MODE.PREVIEW;
  const isConfigurationMode = mode === APPLICATIONS_TABLE_MODE.CONFIGURATION;

  const { loadSettings } = useTableSettings(
    isPreviewMode
      ? TABLES.STAGE_APPLICATION_LIST_PREVIEW.id
      : TABLES.STAGE_APPLICATION_LIST_CONFIGURATION.id
  );

  return React.useMemo(() => {
    if (isLoading) {
      return [];
    }

    const tableSettings = loadSettings();

    const shouldShowPodsColumn = isDefaultCluster;

    const healthColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: columnNames.HEALTH,
      label: 'Health',
      data: {
        render: ({ data: { argoApplication } }) => {
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
      },
      cell: {
        isFixed: true,
        ...getSyncedColumnData(tableSettings, columnNames.HEALTH, 5),
        props: {
          align: 'center',
        },
      },
    };

    const syncColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: columnNames.SYNC,
      label: 'Sync',
      data: {
        render: ({ data: { argoApplication } }) => {
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
      },
      cell: {
        isFixed: true,
        ...getSyncedColumnData(tableSettings, columnNames.SYNC, 5),
        props: {
          align: 'center',
        },
      },
    };

    const applicationColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: columnNames.NAME,
      label: 'Application',
      data: {
        render: ({
          data: {
            application: {
              metadata: { name, namespace },
            },
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
      },
      cell: {
        customizable: false,
        ...getSyncedColumnData(tableSettings, columnNames.NAME, 25),
      },
    };

    const valuesOverrideColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: columnNames.VALUES_OVERRIDE,
      label: (
        <Stack spacing={2}>
          {mode === APPLICATIONS_TABLE_MODE.CONFIGURATION && (
            <div>
              <FormSwitch
                label={undefined}
                {...register(ALL_VALUES_OVERRIDE_KEY, {
                  onChange: handleClickOverrideValuesAll,
                })}
                align={'flex-start'}
                control={control}
                errors={errors}
                defaultValue={buttonsHighlighted.valuesOverride}
              />
            </div>
          )}

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="nowrap">
            <div>Values override</div>
            <Tooltip title={'Override default deployment settings with custom configurations.'}>
              <Icon icon={ICONS.INFO_CIRCLE} width={20} />
            </Tooltip>
          </Stack>
        </Stack>
      ),
      data: {
        render: ({ data }) => {
          const {
            application: {
              metadata: { name: appName },
            },
          } = data;

          return (
            <Stack direction="row" alignItems="center">
              <ValuesOverrideSwitch enrichedApplicationWithArgoApplication={data} mode={mode} />
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
      },
      cell: {
        ...getSyncedColumnData(tableSettings, columnNames.VALUES_OVERRIDE, 15),
      },
    };

    const podsColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: columnNames.PODS,
      label: 'Pods',
      data: {
        render: ({ data }) => {
          const appName = data?.application?.metadata.name;
          const appPods = applicationPodsMap?.[appName];

          const disabled = (() => {
            if (!data?.argoApplication) {
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
                      setDialog(PodsTerminalDialog, {
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
      },
      cell: {
        ...getSyncedColumnData(tableSettings, columnNames.PODS, 10),
        props: {
          align: 'center',
        },
      },
    };

    const ingressColumn: TableColumn<EnrichedApplicationWithArgoApplication> = {
      id: columnNames.INGRESS,
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
      data: {
        render: ({ data }) => {
          const externalURLs =
            // @ts-ignore
            data?.argoApplication?.status?.summary?.externalURLs;

          if (!externalURLs) {
            return null;
          }

          return <TooltipWithLinkList urls={externalURLs} />;
        },
      },
      cell: {
        ...getSyncedColumnData(tableSettings, columnNames.INGRESS, 10),
        props: {
          align: 'center',
        },
      },
    };

    return [
      ...(isConfigurationMode
        ? [
            {
              id: columnNames.EMPTY,
              label: '',
              data: {
                render: () => null,
              },
              cell: {
                customizable: false,
                show: true,
                baseWidth: 5,
                width: 5,
              },
            } as TableColumn<EnrichedApplicationWithArgoApplication>,
          ]
        : []),
      healthColumn,
      syncColumn,
      applicationColumn,
      ...(isPreviewMode
        ? [
            {
              id: columnNames.DEPLOYED_VERSION,
              label: 'Deployed version',
              data: {
                render: ({
                  data: {
                    argoApplication,
                    application: {
                      spec: { lang, framework, buildTool },
                    },
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
              },
              cell: {
                ...getSyncedColumnData(tableSettings, columnNames.DEPLOYED_VERSION, 25),
              },
            } as TableColumn<EnrichedApplicationWithArgoApplication>,
          ]
        : [
            {
              id: columnNames.DEPLOYED_VERSION,
              label: (
                <Stack spacing={2}>
                  <ButtonGroup>
                    <Tooltip title={'Set selected applications latest image stream version'}>
                      <Button
                        onClick={handleClickLatest}
                        variant={buttonsHighlighted.latest ? 'contained' : 'outlined'}
                        color={'primary'}
                        size="small"
                        fullWidth
                      >
                        latest
                      </Button>
                    </Tooltip>
                    <Tooltip title={'Set selected applications stable image stream version'}>
                      <Button
                        onClick={handleClickStable}
                        variant={buttonsHighlighted.stable ? 'contained' : 'outlined'}
                        color={'primary'}
                        size="small"
                        fullWidth
                      >
                        stable
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="nowrap">
                    <div>Deployed version</div>
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
                  </Stack>
                </Stack>
              ),
              labelString: 'Deployed Version',
              data: {
                render: ({ data }) => {
                  return <ImageStreamTagsSelect enrichedApplicationWithArgoApplication={data} />;
                },
              },
              cell: {
                customizable: false,
                ...getSyncedColumnData(tableSettings, columnNames.DEPLOYED_VERSION, 25),
              },
            } as TableColumn<EnrichedApplicationWithArgoApplication>,
          ]),
      valuesOverrideColumn,
      ...(shouldShowPodsColumn
        ? ([podsColumn] as TableColumn<EnrichedApplicationWithArgoApplication>[])
        : []),
      ingressColumn,
    ];
  }, [
    CDPipelineName,
    _createArgoCDLink,
    applicationPodsMap,
    buttonsHighlighted.latest,
    buttonsHighlighted.stable,
    buttonsHighlighted.valuesOverride,
    control,
    errors,
    gitOpsCodebase.data?.status.gitWebUrl,
    gitOpsGitServer?.spec.gitProvider,
    handleClickLatest,
    handleClickOverrideValuesAll,
    handleClickStable,
    isConfigurationMode,
    isDefaultCluster,
    isLoading,
    isPreviewMode,
    loadSettings,
    mode,
    register,
    setDialog,
    stage?.spec.name,
    theme.palette.action.disabled,
    theme.palette.grey,
    theme.palette.text.primary,
  ]);
};
