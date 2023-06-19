import { Icon } from '@iconify/react';
import { Grid, IconButton, Tooltip, useTheme } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../constants/icons';
import { DocLinkProps } from './types';

export const DocLink = ({ href }: DocLinkProps) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={
                <Grid container alignItems={'center'} spacing={1}>
                    <Grid item>Doc</Grid>
                    <span> </span>
                    <Grid item>
                        <Icon
                            icon={ICONS.NEW_WINDOW}
                            color={theme.palette.grey['500']}
                            width="15"
                        />
                    </Grid>
                </Grid>
            }
        >
            <IconButton href={href} target={'_blank'}>
                <Icon icon={ICONS.DOC} />
            </IconButton>
        </Tooltip>
    );
};
