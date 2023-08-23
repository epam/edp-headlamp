import { Icon } from '@iconify/react';
import { Box, Card, CardContent, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { Render } from '../../../../components/Render';
import { useStyles } from './styles';
import { ComponentCardProps } from './types';

export const ComponentCard = ({ component }: ComponentCardProps) => {
    const classes = useStyles();
    const {
        spec: { type, url, visible, icon },
    } = component;
    const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;

    return (
        <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
                <Box className={classes.cardContentRow}>
                    <Grid container spacing={2} alignItems={'center'} wrap={'nowrap'}>
                        <Grid item>
                            <>
                                <Render condition={!!visible}>
                                    <Link href={url} target="_blank" rel="noopener">
                                        <span className={classes.serviceItemIcon}>
                                            <img src={`data:image/svg+xml;base64,${icon}`} alt="" />
                                        </span>
                                    </Link>
                                </Render>
                                <Render condition={!visible}>
                                    <Icon
                                        icon={'ph:placeholder-light'}
                                        className={classes.serviceItemIcon}
                                    />
                                </Render>
                            </>
                        </Grid>
                        <Grid item>
                            <>
                                <Render condition={!!visible}>
                                    <Link href={_url} target="_blank" rel="noopener">
                                        {type}
                                    </Link>
                                </Render>
                                <Render condition={!visible}>
                                    <Typography variant={'body1'}>{type}</Typography>
                                </Render>
                            </>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
};
