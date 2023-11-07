import { Icon } from '@iconify/react';
import { Grid, IconButton, Link as MuiLink, Tooltip, useTheme } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { ResourceIconLinkProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const ResourceIconLink = ({ tooltipTitle, icon, link }: ResourceIconLinkProps) => {
    const theme: DefaultTheme = useTheme();

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={stopPropagation} onFocus={stopPropagation}>
            <Tooltip
                title={
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>{tooltipTitle}</Grid>
                        <span> </span>
                        {!!link && (
                            <Grid item>
                                <Icon
                                    icon={ICONS.NEW_WINDOW}
                                    color={theme.palette.grey['500']}
                                    width="15"
                                />
                            </Grid>
                        )}
                    </Grid>
                }
            >
                <span>
                    <IconButton component={MuiLink} href={link} target={'_blank'} disabled={!link}>
                        <Icon icon={icon} color={theme.palette.grey['500']} width="20" />
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
};
