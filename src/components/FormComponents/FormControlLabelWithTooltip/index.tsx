import { ICONS } from '../../../constants/icons';
import { Iconify, MuiCore, React } from '../../../plugin.globals';
import { rem } from '../../../utils/styling/rem';
import { Render } from '../../Render';
import { useStyles } from './styles';
import { FormControlLabelWithTooltipProps } from './types';

const { Typography, Tooltip, Box } = MuiCore;
const { Icon } = Iconify;

export const FormControlLabelWithTooltip = ({ label, title }: FormControlLabelWithTooltipProps) => {
    const classes = useStyles();
    return (
        <span className={classes.labelWrap}>
            <Typography component={'span'} className={classes.label}>
                {label}
            </Typography>
            <Render condition={!!title}>
                <Tooltip title={title}>
                    <Icon icon={ICONS['INFO_CIRCLE']} width={20} />
                </Tooltip>
            </Render>
            <Render condition={!title}>
                <Box style={{ height: rem(25) }} />
            </Render>
        </span>
    );
};
