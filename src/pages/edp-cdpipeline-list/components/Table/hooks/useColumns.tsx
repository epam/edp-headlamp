import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon/view';
import { EDPCDPipelineKubeObject } from '../../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { CDPIPELINE_ROUTE_NAME } from '../../../../../routes/names';
import { sortByName } from '../../../../../utils/sort/sortByName';
import { sortByStatus } from '../../../../../utils/sort/sortByStatus';
import { RowActions } from '../components/RowActions';

const {
    pluginLib: { React, CommonComponents, MuiCore },
} = globalThis;
const { Link } = CommonComponents;
const { Typography } = MuiCore;

const MapProperties: React.FC<{
    properties: string[];
}> = ({ properties }): React.ReactElement => {
    return (
        <>
            {properties.map((el, idx) => {
                const propertyId = `${el}:${idx}`;

                return (
                    <>
                        <Render condition={idx !== 0}>
                            <Typography component="span" key={propertyId}>
                                ,{' '}
                            </Typography>
                        </Render>
                        <Typography component="span" key={propertyId}>
                            {el}
                        </Typography>
                    </>
                );
            })}
        </>
    );
};

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
                getter: ({ spec: { applications } }) => <MapProperties properties={applications} />,
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
