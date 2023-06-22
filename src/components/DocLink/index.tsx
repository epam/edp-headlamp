import { Icon } from '@iconify/react';
import { Button, Grid, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { ICONS } from '../../constants/icons';
import { Render } from '../Render';
import { DocLinkProps } from './types';

export const DocLink = ({
    href,
    variant = 'rounded',
    title = 'Read documentation',
    objectToRegard,
}: DocLinkProps) => {
    const theme = useTheme();

    return (
        <Tooltip
            title={
                <Grid container alignItems={'center'} spacing={1}>
                    <Grid item>
                        <Render condition={!!objectToRegard}>
                            <>
                                {title} regarding <strong>{objectToRegard} </strong>
                            </>
                        </Render>
                        <Render condition={!objectToRegard}>
                            <>{title} </>
                        </Render>
                        <Icon
                            icon={ICONS.NEW_WINDOW}
                            color={theme.palette.grey['500']}
                            width="15"
                        />
                    </Grid>
                </Grid>
            }
        >
            <div>
                <Render condition={variant === 'rounded'}>
                    <IconButton href={href} target={'_blank'}>
                        <Icon icon={ICONS.DOC} />
                    </IconButton>
                </Render>
                <Render condition={variant === 'straight'}>
                    <Button
                        href={href}
                        target={'_blank'}
                        variant={'outlined'}
                        startIcon={<Icon icon={ICONS.DOC} color={theme.palette.grey['500']} />}
                    >
                        <Typography>docs</Typography>
                    </Button>
                </Render>
            </div>
        </Tooltip>
    );
};
