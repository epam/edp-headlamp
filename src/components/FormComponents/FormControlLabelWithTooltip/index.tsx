import { Icon } from '@iconify/react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../../constants/icons';
import { rem } from '../../../utils/styling/rem';
import { Render } from '../../Render';
import { useStyles } from './styles';
import { FormControlLabelWithTooltipProps } from './types';

export const FormControlLabelWithTooltip = ({ label, title }: FormControlLabelWithTooltipProps) => {
    const classes = useStyles();
    return (
        <span className={classes.labelWrap}>
            <Typography component={'span'} className={classes.label}>
                {label}
            </Typography>
            <Render condition={!!title}>
                <Tooltip title={title}>
                    <Icon icon={ICONS.INFO_CIRCLE} width={20} />
                </Tooltip>
            </Render>
            <Render condition={!title}>
                <Box style={{ height: rem(25) }} />
            </Render>
        </span>
    );
};
