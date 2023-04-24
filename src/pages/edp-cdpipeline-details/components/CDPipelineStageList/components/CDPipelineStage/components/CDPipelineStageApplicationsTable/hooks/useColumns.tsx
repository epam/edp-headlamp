import { HeadlampSimpleTableGetterColumn } from '../../../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../../../components/StatusIcon';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../../../../../../../configs/codebase-mappings';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../../../constants/statuses';
import { EnrichedApplication } from '../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../k8s/Application/types';
import { MuiCore, pluginLib, React } from '../../../../../../../../../plugin.globals';
import { COMPONENTS_ROUTE_NAME } from '../../../../../../../../../routes/names';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../../../../../utils/routes/createRouteName';
import { createArgoCDApplicationLink } from '../../../../../../../../../utils/url/createArgoCDApplicationLink';
import { ImageStreamTagsSelect } from '../components/ImageStreamTagsSelect';

const {
    CommonComponents: { Link },
} = pluginLib;

const { Link: MuiLink } = MuiCore;

export const useColumns = (
    qualityGatePipelineIsRunning: boolean,
    argoCDURLOrigin: string
): HeadlampSimpleTableGetterColumn<{
    enrichedApplication: EnrichedApplication;
    argoApplication: ApplicationKubeObjectInterface;
}>[] =>
    React.useMemo(
        () => [
            {
                label: 'Health',
                getter: ({ argoApplication }) =>
                    //@ts-ignore
                    argoApplication?.status?.health?.status ? (
                        <StatusIcon
                            //@ts-ignore
                            status={argoApplication.status.health.status.toLowerCase()}
                        />
                    ) : (
                        <StatusIcon status={CUSTOM_RESOURCE_STATUSES['UNKNOWN']} />
                    ),
            },
            {
                label: 'Sync',
                getter: ({ argoApplication }) =>
                    //@ts-ignore
                    argoApplication?.status?.sync?.status ? (
                        <StatusIcon
                            //@ts-ignore
                            status={argoApplication.status.sync.status.toLowerCase()}
                        />
                    ) : (
                        <StatusIcon status={CUSTOM_RESOURCE_STATUSES['UNKNOWN']} />
                    ),
            },
            {
                label: 'Application',
                getter: ({
                    enrichedApplication: {
                        application: {
                            metadata: { name, namespace },
                        },
                    },
                }) => {
                    return (
                        <Link
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                COMPONENTS_ROUTE_NAME
                            )}
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
            {
                label: 'Deployed version',
                getter: ({
                    argoApplication,
                    enrichedApplication: {
                        application: {
                            spec: { lang, framework, buildTool },
                        },
                    },
                }) => {
                    if (!argoApplication) {
                        return;
                    }
                    const isHelm =
                        lang === CODEBASE_COMMON_LANGUAGES.HELM &&
                        framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
                        buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

                    const deployedVersion = !isHelm
                        ? argoApplication.spec.source.helm.parameters.find(
                              el => el.name === 'image.tag'
                          )?.value
                        : argoApplication.spec.source.targetRevision;

                    return argoApplication ? (
                        <>
                            <MuiLink
                                href={createArgoCDApplicationLink(
                                    argoCDURLOrigin,
                                    argoApplication.metadata.labels['app.edp.epam.com/pipeline'],
                                    argoApplication.metadata.labels['app.edp.epam.com/stage'],
                                    argoApplication.metadata.labels['app.edp.epam.com/app-name']
                                )}
                                target={'_blank'}
                            >
                                {deployedVersion}
                            </MuiLink>
                        </>
                    ) : (
                        'No deploy'
                    );
                },
            },
            {
                label: 'Image stream version',
                getter: ({ enrichedApplication, argoApplication }) => (
                    <ImageStreamTagsSelect
                        enrichedApplication={enrichedApplication}
                        argoApplication={argoApplication}
                        qualityGatePipelineIsRunning={qualityGatePipelineIsRunning}
                    />
                ),
            },
        ],
        [argoCDURLOrigin, qualityGatePipelineIsRunning]
    );
