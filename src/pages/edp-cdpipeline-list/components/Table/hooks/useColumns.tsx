import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { StatusIcon } from '../../../../../components/StatusIcon/view';
import { EDPCDPipelineKubeObject } from '../../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { CDPIPELINE_ROUTE_NAME } from '../../../../../routes/names';

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
            {properties.map((el, idx) => (
                <>
                    <Render condition={idx !== 0}>
                        <Typography component="span">, </Typography>
                    </Render>
                    <Typography component="span">{el}</Typography>
                </>
            ))}
        </>
    );
};

export const useColumns = (): HeadlampSimpleTableGetterColumn<EDPCDPipelineKubeObjectInterface>[] =>
    React.useMemo(
        () => [
            {
                label: 'Status',
                getter: ({ status: { status } }) => <StatusIcon status={status} />,
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
            },
            {
                label: 'Applications',
                getter: ({ spec: { applications } }) => <MapProperties properties={applications} />,
            },
        ],
        []
    );
