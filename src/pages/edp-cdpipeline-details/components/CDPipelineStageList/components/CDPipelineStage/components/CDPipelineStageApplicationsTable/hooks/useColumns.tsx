import { HeadlampSimpleTableGetterColumn } from '../../../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../../../components/StatusIcon';
import {
    CODEBASE_COMMON_BUILD_TOOLS,
    CODEBASE_COMMON_FRAMEWORKS,
    CODEBASE_COMMON_LANGUAGES,
} from '../../../../../../../../../configs/codebase-mappings';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../../../constants/statuses';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../k8s/Application/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { useEDPComponentsURLsQuery } from '../../../../../../../../../k8s/EDPComponent/hooks/useEDPComponentsURLsQuery';
import { MuiCore, pluginLib, React } from '../../../../../../../../../plugin.globals';
import { COMPONENTS_ROUTE_NAME } from '../../../../../../../../../routes/names';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../../../../../utils/routes/createRouteName';
import { createArgoCDApplicationLink } from '../../../../../../../../../utils/url/createArgoCDApplicationLink';
import { createJaegerLink } from '../../../../../../../../../utils/url/createJaegerLink';
import { ImageStreamTagsSelect } from '../components/ImageStreamTagsSelect';

const {
    CommonComponents: { Link },
} = pluginLib;

const { Link: MuiLink } = MuiCore;

export const useColumns = (
    qualityGatePipelineIsRunning: boolean
): HeadlampSimpleTableGetterColumn<{
    enrichedApplicationWithItsImageStreams: EnrichedApplicationWithItsImageStreams;
    argoApplication: ApplicationKubeObjectInterface;
}>[] => {
    const { data: EDPComponentsURLS } = useEDPComponentsURLsQuery();
    const _createArgoCDLink = React.useCallback(
        (argoApplication: ApplicationKubeObjectInterface) =>
            EDPComponentsURLS && Object.hasOwn(EDPComponentsURLS, 'argocd')
                ? createArgoCDApplicationLink(
                      EDPComponentsURLS?.argocd,
                      argoApplication.metadata.labels['app.edp.epam.com/pipeline'],
                      argoApplication.metadata.labels['app.edp.epam.com/stage'],
                      argoApplication.metadata.labels['app.edp.epam.com/app-name']
                  )
                : null,
        [EDPComponentsURLS]
    );

    const _createJaegerLink = React.useCallback(
        (argoApplication: ApplicationKubeObjectInterface) =>
            argoApplication && EDPComponentsURLS && Object.hasOwn(EDPComponentsURLS, 'jaeger')
                ? createJaegerLink(EDPComponentsURLS?.jaeger, argoApplication?.metadata?.name)
                : null,
        [EDPComponentsURLS]
    );

    return React.useMemo(
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
                    enrichedApplicationWithItsImageStreams: {
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
                    enrichedApplicationWithItsImageStreams: {
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
                        ? argoApplication?.spec?.source?.helm?.parameters?.find(
                              el => el.name === 'image.tag'
                          )?.value
                        : argoApplication?.spec?.source?.targetRevision;

                    return argoApplication ? (
                        <>
                            <MuiLink href={_createArgoCDLink(argoApplication)} target={'_blank'}>
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
                getter: ({ enrichedApplicationWithItsImageStreams, argoApplication }) => {
                    const jaegerLink = _createJaegerLink(argoApplication);

                    return (
                        <ImageStreamTagsSelect
                            enrichedApplicationWithItsImageStreams={
                                enrichedApplicationWithItsImageStreams
                            }
                            argoApplication={argoApplication}
                            qualityGatePipelineIsRunning={qualityGatePipelineIsRunning}
                            jaegerLink={jaegerLink}
                        />
                    );
                },
            },
        ],
        [_createArgoCDLink, _createJaegerLink, qualityGatePipelineIsRunning]
    );
};
