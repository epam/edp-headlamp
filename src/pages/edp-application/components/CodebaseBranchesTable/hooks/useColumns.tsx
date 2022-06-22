import clsx from 'clsx';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../../k8s/EDPCodebaseBranch/types';
import { capitalizeFirstLetter } from '../../../../../utils/format/capitalizeFirstLetter';
import { getStatusIconByStatusName } from '../../../../../utils/styling/getStatusIconByStatusName';

const {
    pluginLib: { React, Iconify, MuiCore },
} = window;
const { Icon } = Iconify;
const { Tooltip } = MuiCore;

export const useColumns = (classes: { [key: string]: any }) =>
    React.useMemo(() => {
        return [
            {
                label: 'Status',
                getter: ({ status: { status } }: EDPCodebaseBranchKubeObjectInterface) => {
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
                label: 'Branch Name',
                getter: ({ spec: { branchName } }: EDPCodebaseBranchKubeObjectInterface) =>
                    branchName,
            },
            {
                label: 'Last Time Updated',
                getter: ({ status: { lastTimeUpdated } }: EDPCodebaseBranchKubeObjectInterface) =>
                    lastTimeUpdated,
            },
        ];
    }, []);
