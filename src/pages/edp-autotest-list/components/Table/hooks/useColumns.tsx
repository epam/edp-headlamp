import clsx from 'clsx';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { EDPCodebaseKubeObject } from '../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { AUTOTEST_ROUTE_NAME } from '../../../../../routes/names';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getStatusIconByStatusName } from '../../../../../utils/styling/getStatusIconByStatusName';

const {
    pluginLib: { React, CommonComponents, Iconify, MuiCore },
} = globalThis;
const { Icon } = Iconify;
const { Link } = CommonComponents;
const { Tooltip } = MuiCore;

export const useColumns = (classes: {
    [key: string]: string;
}): HeadlampSimpleTableGetterColumn<EDPCodebaseKubeObjectInterface>[] =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status: { status } }) => {
                    const [icon, color, animate] = getStatusIconByStatusName(status);
                    return (
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
                    );
                },
            },
            {
                label: 'Autotest',
                getter: data => {
                    const kubeObjectBasedOnData = new EDPCodebaseKubeObject(data);
                    return (
                        <Link to={kubeObjectBasedOnData.getDetailsLink(AUTOTEST_ROUTE_NAME)}>
                            {data.metadata.name}
                        </Link>
                    );
                },
            },
            {
                label: 'Language',
                getter: ({ spec: { lang } }) => lang,
            },
            {
                label: 'Build Tool',
                getter: ({ spec: { buildTool } }) => buildTool,
            },
            {
                label: 'Framework',
                getter: ({ spec: { framework } }) => framework,
            },
            {
                label: 'CI Tool',
                getter: ({ spec: { ciTool } }) => ciTool,
            },
        ];
    }, [classes]);
