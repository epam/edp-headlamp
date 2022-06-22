import clsx from 'clsx';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getStatusIconByStatusName } from '../../../../../utils/styling/getStatusIconByStatusName';

const {
    pluginLib: { React, CommonComponents, Iconify, MuiCore },
} = window;
const { Icon } = Iconify;
const { Link } = CommonComponents;
const { Tooltip } = MuiCore;

export const useColumns = (classes: { [key: string]: any }) =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status: { status } }: EDPCodebaseKubeObject) => {
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
                getter: (data: EDPCodebaseKubeObject) => (
                    <Link kubeObject={data}>{data.metadata.name}</Link>
                ),
            },
            {
                label: 'Language',
                getter: ({ spec: { lang } }: EDPCodebaseKubeObject) => lang,
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { buildTool } }: EDPCodebaseKubeObject) => buildTool,
            },
            {
                label: 'Framework',
                getter: ({ spec: { framework } }: EDPCodebaseKubeObject) => framework,
            },
            {
                label: 'CI Tool',
                getter: ({ spec: { ciTool } }: EDPCodebaseKubeObject) => ciTool,
            },
        ];
    }, [classes]);
