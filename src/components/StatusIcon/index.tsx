import clsx from 'clsx';
import { Iconify, MuiCore, React } from '../../plugin.globals';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';
import { getCustomResourceStatusIconByStatusName } from '../../utils/styling/getCustomResourceStatusIconByStatusName';
import { useStyles } from './styles';
import { StatusIconProps } from './types';

const { Icon } = Iconify;
const { Tooltip } = MuiCore;

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const StatusIcon = ({ status, customTitle, width = 25 }: StatusIconProps) => {
    const classes = useStyles();

    const [icon, color, animate] = getCustomResourceStatusIconByStatusName(status);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={stopPropagation}>
            <Tooltip title={customTitle ?? capitalizeFirstLetter(status)} interactive>
                <Icon
                    icon={icon}
                    color={color}
                    width={width}
                    className={clsx(classes.icon, {
                        [classes.rotateIcon]: animate,
                    })}
                />
            </Tooltip>
        </div>
    );
};
