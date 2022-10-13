import { CUSTOM_RESOURCE_STATUSES } from '../../../constants/statuses';
import { EDPCDPipelineKubeObject } from '../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../k8s/EDPCDPipeline/types';
import { pluginLib, React } from '../../../plugin.globals';
import { CDPIPELINES_ROUTE_NAME } from '../../../routes/names';
import { createRouteNameBasedOnNameAndNamespace } from '../../../utils/routes/createRouteName';
import { sortByName } from '../../../utils/sort/sortByName';
import { sortByStatus } from '../../../utils/sort/sortByStatus';
import { CDPipelineActions } from '../../CDPipelineActions';
import { HeadlampSimpleTableGetterColumn } from '../../HeadlampSimpleTable/types';
import { MappedProperties } from '../../MappedProperties';
import { StatusIcon } from '../../StatusIcon';

const {
    CommonComponents: { Link },
} = pluginLib;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCDPipelineKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status }) => (
                    <StatusIcon
                        status={status ? status.status : CUSTOM_RESOURCE_STATUSES['UNKNOWN']}
                    />
                ),
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'CD Pipeline',
                getter: ({ metadata: { name, namespace } }) => {
                    return (
                        <Link
                            routeName={createRouteNameBasedOnNameAndNamespace(
                                CDPIPELINES_ROUTE_NAME
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
                sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
            },
            {
                label: 'Applications',
                getter: ({ spec: { applications } }) => (
                    <MappedProperties properties={applications} variant={'block'} />
                ),
            },
            {
                label: '',
                getter: kubeObjectData => (
                    <CDPipelineActions
                        kubeObject={EDPCDPipelineKubeObject}
                        kubeObjectData={kubeObjectData}
                    />
                ),
            },
        ],
        []
    );
