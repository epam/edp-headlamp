import { Icon } from '@iconify/react';
import { Grid, IconButton, Tooltip, useTheme } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { DocLinkProps } from './types';

export const DocLink = ({ href, isDocRootPage = false }: DocLinkProps) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={
                <Grid container alignItems={'center'} spacing={1}>
                    <Grid item>
                        <>{isDocRootPage ? 'User guide' : 'Documentation'} </>
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
                <Icon icon={isDocRootPage ? ICONS.DOC : ICONS.DOC_PAGE} />
            </IconButton>
        </Tooltip>
    );
};
