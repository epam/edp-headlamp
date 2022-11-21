import clsx from 'clsx';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { getCustomResourceStatusIconByStatusName } from '../../utils/styling/getCustomResourceStatusIconByStatusName';
import { useStyles } from './styles';
import { StatusIconProps } from './types';

const { Icon } = Iconify;
const { Tooltip } = MuiCore;

export const StatusIcon = ({
    status,
    customTitle,
    width = 25,
}: StatusIconProps): React.ReactElement => {
    const classes = useStyles();

    const [icon, color, animate] = getCustomResourceStatusIconByStatusName(status);

    return (
        <div>
            <Tooltip title={customTitle ?? capitalizeFirstLetter(status)}>
                <Icon
                    icon={icon}
                    color={color}
                    width={width}
                    className={clsx({
                        [classes.icon]: animate,
                        [classes.rotateIcon]: animate,
                    })}
                />
            </Tooltip>
        </div>
    );
};
