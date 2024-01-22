import { Icon } from '@iconify/react';
import { Link } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, IconButton, Link as MuiLink, Tooltip, useTheme } from '@material-ui/core';
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
import { GIT_SERVERS } from '../../../../../constants/gitServers';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { ApplicationKubeObject } from '../../../../../k8s/Application';
import {
    APPLICATION_LABEL_SELECTOR_APP_NAME,
    APPLICATION_LABEL_SELECTOR_PIPELINE,
    APPLICATION_LABEL_SELECTOR_STAGE,
} from '../../../../../k8s/Application/labels';
import { ApplicationKubeObjectInterface } from '../../../../../k8s/Application/types';
import { getDeployedVersion } from '../../../../../k8s/Application/utils/getDeployedVersion';
import {
    SYSTEM_EDP_COMPONENTS,
    SYSTEM_EDP_COMPONENTS_LABELS,
} from '../../../../../k8s/EDPComponent/constants';
import { useEDPComponentsURLsQuery } from '../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { LinkCreationService } from '../../../../../services/link-creation';
import { rem } from '../../../../../utils/styling/rem';
import { PODS_LOG_VIEWER_DIALOG_NAME } from '../../../../../widgets/PodsLogViewer/constants';
import { PODS_TERMINAL_DIALOG_NAME } from '../../../../../widgets/PodsTerminal/constants';
import { routeEDPComponentDetails } from '../../../../edp-component-details/route';
import { useDataContext } from '../../../providers/Data/hooks';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EDPStageDetailsRouteParams, EnrichedApplicationWithArgoApplication } from '../../../types';
import { ImageStreamTagsSelect } from '../components/ImageStreamTagsSelect';
import { ValuesOverrideCheckbox } from '../components/ValuesOverrideCheckbox';

export const useColumns = (
    qualityGatePipelineIsRunning: boolean,
    handleSelectRowClick: (
        event: React.MouseEvent<unknown>,
        row: EnrichedApplicationWithArgoApplication
    ) => void,
    selected: string[]
): TableColumn<EnrichedApplicationWithArgoApplication>[] => {
    const theme = useTheme();
    const { namespace, CDPipelineName } = useParams<EDPStageDetailsRouteParams>();
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery(namespace);
    const { gitOpsCodebase } = useDataContext();
    const { stage } = useDynamicDataContext();
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

    const { setDialog } = useDialogContext();

    return React.useMemo(
        () => [
            {
                id: 'health',
                label: 'Health',
                render: ({ argoApplication }) => {
                    const health = argoApplication?.status?.health?.status;

                    const [icon, color, isRotating] =
                        ApplicationKubeObject.getHealthStatusIcon(health);

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
            },
            {
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
            },
            {
                id: 'application',
                label: 'Application',
                render: ({
                    application: {
                        metadata: { name, namespace },
                    },
                }) => {
                    return (
                        <Link
                            routeName={routeEDPComponentDetails.path}
                            params={{
                                name,
                                namespace,
                            }}
                        >
                            {name}
                        </Link>
                    );
                },
                width: '20%',
            },
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

                    return argoApplication ? (
                        <Tooltip
                            title={
                                <Grid container alignItems={'center'} spacing={1}>
                                    <Grid item>
                                        Open in{' '}
                                        {SYSTEM_EDP_COMPONENTS_LABELS[SYSTEM_EDP_COMPONENTS.ARGOCD]}
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
                            <MuiLink href={_createArgoCDLink(argoApplication)} target={'_blank'}>
                                {deployedVersion}
                            </MuiLink>
                        </Tooltip>
                    ) : (
                        'No deploy'
                    );
                },
                width: '15%',
            },
            {
                id: 'valuesOverride',
                label: (
                    <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                        <Grid item>Values override</Grid>
                        <Grid item>
                            <Tooltip
                                title={
                                    'Redefines pipeline settings, thus enabling a GitOps approach for the Environment .'
                                }
                            >
                                <Icon icon={ICONS.INFO_CIRCLE} width={18} />
                            </Tooltip>
                        </Grid>
                    </Grid>
                ),
                render: enrichedApplicationWithArgoApplication => {
                    const withValuesOverride =
                        enrichedApplicationWithArgoApplication?.argoApplication
                            ? Object.hasOwn(
                                  enrichedApplicationWithArgoApplication?.argoApplication?.spec,
                                  'sources'
                              )
                            : false;

                    const {
                        application: {
                            metadata: { name: appName },
                            spec: { gitServer },
                        },
                    } = enrichedApplicationWithArgoApplication;

                    return (
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item>
                                <ValuesOverrideCheckbox
                                    enrichedApplicationWithArgoApplication={
                                        enrichedApplicationWithArgoApplication
                                    }
                                    selected={selected}
                                    handleSelectRowClick={handleSelectRowClick}
                                    defaultValue={withValuesOverride}
                                />
                            </Grid>
                            <Grid item>
                                <ResourceIconLink
                                    tooltipTitle={'Go to the Source Code'}
                                    link={LinkCreationService.git.createGitOpsValuesYamlFileLink(
                                        gitOpsCodebase?.status.gitWebUrl,
                                        CDPipelineName,
                                        stage?.spec.name,
                                        appName,
                                        gitServer as GIT_SERVERS
                                    )}
                                    icon={ICONS.GIT_BRANCH}
                                />
                            </Grid>
                        </Grid>
                    );
                },
                width: '15%',
                textAlign: 'center',
            },
            {
                id: 'imageStreamVersion',
                label: 'Image stream version',
                render: enrichedApplicationWithArgoApplication => {
                    return (
                        <ImageStreamTagsSelect
                            enrichedApplicationWithArgoApplication={
                                enrichedApplicationWithArgoApplication
                            }
                            selected={selected}
                            handleSelectRowClick={handleSelectRowClick}
                        />
                    );
                },
                width: '20%',
            },
            ...(stage?.spec.clusterName === 'in-cluster'
                ? ([
                      {
                          id: 'pods',
                          label: <div style={{ paddingLeft: rem(10) }}>Pods</div>,
                          render: enrichedApplicationWithArgoApplication => {
                              return (
                                  <Grid container spacing={1} alignItems={'center'}>
                                      <Grid item>
                                          <Tooltip title={'Show Logs'}>
                                              <IconButton
                                                  onClick={() =>
                                                      setDialog({
                                                          modalName: PODS_LOG_VIEWER_DIALOG_NAME,
                                                          forwardedProps: {
                                                              stageNamespace: stage?.spec.namespace,
                                                              appName:
                                                                  enrichedApplicationWithArgoApplication
                                                                      ?.application?.metadata.name,
                                                          },
                                                      })
                                                  }
                                                  disabled={
                                                      !enrichedApplicationWithArgoApplication?.argoApplication
                                                  }
                                              >
                                                  <Icon icon="mdi:file-document-box-outline" />
                                              </IconButton>
                                          </Tooltip>
                                      </Grid>
                                      <Grid item>
                                          <Tooltip title={'Show Terminal'}>
                                              <IconButton
                                                  onClick={() =>
                                                      setDialog({
                                                          modalName: PODS_TERMINAL_DIALOG_NAME,
                                                          forwardedProps: {
                                                              stageNamespace: stage?.spec.namespace,
                                                              appName:
                                                                  enrichedApplicationWithArgoApplication
                                                                      ?.application?.metadata.name,
                                                          },
                                                      })
                                                  }
                                                  disabled={
                                                      !enrichedApplicationWithArgoApplication?.argoApplication
                                                  }
                                              >
                                                  <Icon icon="mdi:console" />
                                              </IconButton>
                                          </Tooltip>
                                      </Grid>
                                  </Grid>
                              );
                          },
                          textAlign: 'center',
                          width: '10%',
                      },
                  ] as TableColumn<EnrichedApplicationWithArgoApplication>[])
                : []),
            {
                id: 'ingress',
                label: (
                    <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                        <Grid item>Ingress</Grid>
                        <Grid item>
                            <Tooltip
                                title={
                                    'The Ingress endpoint directs you to the deployed application. To view the link, ensure your application is deployed with an Ingress controller.'
                                }
                            >
                                <Icon icon={ICONS.INFO_CIRCLE} width={18} />
                            </Tooltip>
                        </Grid>
                    </Grid>
                ),
                render: enrichedApplicationWithArgoApplication => {
                    const externalURLs =
                        // @ts-ignore
                        enrichedApplicationWithArgoApplication?.argoApplication?.status?.summary
                            ?.externalURLs;

                    if (!externalURLs) {
                        return null;
                    }

                    return (
                        <Tooltip
                            title={
                                <Grid container spacing={2}>
                                    {externalURLs.map(el => (
                                        <Grid item xs={12}>
                                            <MuiLink
                                                href={el}
                                                target={'_blank'}
                                                style={{ color: 'white', wordBreak: 'break-all' }}
                                            >
                                                {el}
                                            </MuiLink>
                                        </Grid>
                                    ))}
                                </Grid>
                            }
                            interactive
                        >
                            <div style={{ lineHeight: 0 }}>
                                <Icon icon={ICONS.NEW_WINDOW} width={24} />
                            </div>
                        </Tooltip>
                    );
                },
            },
        ],
        [
            CDPipelineName,
            _createArgoCDLink,
            gitOpsCodebase,
            handleSelectRowClick,
            selected,
            setDialog,
            stage,
            theme,
        ]
    );
};
