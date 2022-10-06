import { CUSTOM_RESOURCE_STATUSES } from '../../../constants/statuses';
import { EDPCDPipelineKubeObject } from '../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../k8s/EDPCDPipeline/types';
import { pluginLib, React } from '../../../plugin.globals';
import { CDPIPELINE_ROUTE_NAME } from '../../../routes/names';
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
                getter: data => {
                    const kubeObjectBasedOnData = new EDPCDPipelineKubeObject(data);
                    return (
                        <Link
                            to={kubeObjectBasedOnData.getDetailsLink(CDPIPELINE_ROUTE_NAME)}
                            kubeOject={null}
                            routeName={null}
                        >
                            {data.metadata.name}
                        </Link>
                    );
                },
                sort: (a, b) => sortByName(a.metadata.name, b.metadata.name),
            },
            {
                label: 'Applications',
                getter: ({ spec: { applications } }) => (
                    <MappedProperties properties={applications} />
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
