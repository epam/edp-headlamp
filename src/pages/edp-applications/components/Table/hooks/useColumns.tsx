import clsx from 'clsx';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { APPLICATION_ROUTE_NAME } from '../../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getStatusIconByStatusName } from '../../../../../utils/styling/getStatusIconByStatusName';

const {
    pluginLib: { React, CommonComponents, Iconify, MuiCore },
} = globalThis;
const { Icon } = Iconify;
const { Link } = CommonComponents;
const { Tooltip } = MuiCore;

export const useColumns = (classes: { [key: string]: any }) =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status: { status } }: EDPCodebaseKubeObjectInterface) => {
                    const [icon, color, animate] = getStatusIconByStatusName(status);
                    return (
                        <Tooltip title={capitalizeFirstLetter(status)}>
                            <Icon
                                icon={icon}
                                color={color}
                                width="30"
                                className={clsx({
                                    [classes.icon]: animate,
                                    [classes.rotateIcon]: animate,
                                })}
                            />
                        </Tooltip>
                    );
                },
            },
            {
                label: 'Application',
                getter: (data: EDPCodebaseKubeObjectInterface) => {
                    const kubeObjectBasedOnData = new EDPCodebaseKubeObject(data);
                    return (
                        <Link to={kubeObjectBasedOnData.getDetailsLink(APPLICATION_ROUTE_NAME)}>
                            {data.metadata.name}
                        </Link>
                    );
                },
            },
            {
                label: 'Language',
                getter: ({ spec: { lang } }: EDPCodebaseKubeObjectInterface) => lang,
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { buildTool } }: EDPCodebaseKubeObjectInterface) => buildTool,
            },
            {
                label: 'Framework',
                getter: ({ spec: { framework } }: EDPCodebaseKubeObjectInterface) => framework,
            },
            {
                label: 'CI Tool',
                getter: ({ spec: { ciTool } }: EDPCodebaseKubeObjectInterface) => ciTool,
            },
        ];
    }, [classes]);
