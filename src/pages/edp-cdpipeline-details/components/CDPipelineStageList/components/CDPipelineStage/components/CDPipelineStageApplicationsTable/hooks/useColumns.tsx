import { HeadlampSimpleTableGetterColumn } from '../../../../../../../../../components/HeadlampSimpleTable/types';
import { StatusIcon } from '../../../../../../../../../components/StatusIcon';
import { CUSTOM_RESOURCE_STATUSES } from '../../../../../../../../../constants/statuses';
import { EnrichedApplication } from '../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../k8s/Application/types';
import { pluginLib, React } from '../../../../../../../../../plugin.globals';
import { COMPONENTS_ROUTE_NAME } from '../../../../../../../../../routes/names';
import { createRouteNameBasedOnNameAndNamespace } from '../../../../../../../../../utils/routes/createRouteName';
import { ImageStreamTagsSelect } from '../components/ImageStreamTagsSelect';

const {
    CommonComponents: { Link },
} = pluginLib;

export const useColumns = (
    qualityGatePipelineIsRunning: boolean
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
                getter: ({ argoApplication }) =>
                    argoApplication
                        ? argoApplication.spec.source.helm.parameters.find(
                              el => el.name === 'image.tag'
                          ).value
                        : 'No deploy',
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
        [qualityGatePipelineIsRunning]
    );
