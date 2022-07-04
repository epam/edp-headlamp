import clsx from 'clsx';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { Render } from '../../../../../components/Render';
import { EDPCDPipelineKubeObject } from '../../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../k8s/EDPCDPipeline/types';
import { CDPIPELINE_ROUTE_NAME } from '../../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getStatusIconByStatusName } from '../../../../../utils/styling/getStatusIconByStatusName';

const {
    pluginLib: { React, CommonComponents, Iconify, MuiCore },
} = globalThis;
const { Icon } = Iconify;
const { Link } = CommonComponents;
const { Tooltip, Typography } = MuiCore;

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

export const useColumns = (classes: {
    [key: string]: string;
}): HeadlampSimpleTableGetterColumn<EDPCDPipelineKubeObjectInterface>[] => [
    {
        label: 'Status',
        getter: ({ status: { status } }) => {
            const [icon, color, animate] = getStatusIconByStatusName(status);
            return (
                <div className={classes.iconWrapper}>
                    <Tooltip title={capitalizeFirstLetter(status)}>
                        <Icon
                            icon={icon}
                            color={color}
                            width="25"
                            className={clsx({
                                [classes.icon]: animate,
                                [classes.rotateIcon]: animate,
                            })}
                        />
                    </Tooltip>
                </div>
            );
        },
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
];
