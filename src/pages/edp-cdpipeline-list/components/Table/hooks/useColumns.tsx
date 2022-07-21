import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { MappedProperties } from '../../../../../components/MappedProperties';
import { StatusIcon } from '../../../../../components/StatusIcon';
import { EDPCDPipelineKubeObject } from '../../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { pluginLib, React } from '../../../../../plugin.globals';
import { CDPIPELINE_ROUTE_NAME } from '../../../../../routes/names';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';
import { RowActions } from '../components/RowActions';

const {
    CommonComponents: { Link },
} = pluginLib;

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCDPipelineKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: { status } }) => <StatusIcon status={status} />,
                sort: (a, b) => sortByStatus(a.status.status, b.status.status),
            },
            {
                label: 'CD Pipeline',
                getter: data => {
                    const kubeObjectBasedOnData = new EDPCDPipelineKubeObject(data);
                    return (
                        <Link to={kubeObjectBasedOnData.getDetailsLink(CDPIPELINE_ROUTE_NAME)}>
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
                    <RowActions
                        kubeObject={EDPCDPipelineKubeObject}
                        kubeObjectData={kubeObjectData.jsonData}
                    />
                ),
            },
        ],
        []
    );
