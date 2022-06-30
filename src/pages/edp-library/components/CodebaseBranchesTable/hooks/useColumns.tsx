import clsx from 'clsx';
import { HeadlampSimpleTableGetterColumn } from '../../../../../components/HeadlampSimpleTable/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getStatusIconByStatusName } from '../../../../../utils/styling/getStatusIconByStatusName';

const {
    pluginLib: { React, Iconify, MuiCore },
} = globalThis;
const { Icon } = Iconify;
const { Tooltip } = MuiCore;

export const useColumns = (classes: {
    [key: string]: any;
}): HeadlampSimpleTableGetterColumn<EDPCodebaseBranchKubeObjectInterface>[] =>
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
                label: 'Branch Name',
                getter: ({ spec: { branchName } }) => branchName,
            },
            {
                label: 'Last Time Updated',
                getter: ({ status: { lastTimeUpdated } }) => lastTimeUpdated,
            },
        ];
    }, []);
