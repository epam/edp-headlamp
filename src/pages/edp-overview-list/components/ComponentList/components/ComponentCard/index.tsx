import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Link,
    Link as MuiLink,
    Tooltip,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Render } from '../../../../../../components/Render';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { routeEDPComponentList } from '../../../../../edp-configuration/pages/edp-component-list/route';
import { useStyles } from './styles';
import { ComponentCardProps } from './types';

const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

export const ComponentCard = ({ component }: ComponentCardProps) => {
    const classes = useStyles();
    const {
        spec: { type, url, visible, icon },
    } = component;
    const _url = !/^https?:\/\//i.test(url) ? `https://${url}` : url;
    const history = useHistory();
    const configurationRoute = Router.createRouteURL(routeEDPComponentList.path);

    return (
        <Card className={classes.cardRoot}>
            <CardContent className={classes.cardContent}>
                <div>
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                        wrap={'nowrap'}
                    >
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
                    </Grid>
                </div>
                <div className={classes.cardBack}>
                    <Grid container spacing={1} justifyContent={'center'}>
                        <Grid item xs={12}>
                            <Tooltip title={type} placement={'top'}>
                                <Typography
                                    variant={'body2'}
                                    align={'center'}
                                    className={classes.cardTitle}
                                >
                                    {type}
                                </Typography>
                            </Tooltip>
                        </Grid>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <Grid item onClick={stopPropagation} onFocus={stopPropagation}>
                            <Tooltip
                                title={
                                    <Grid container alignItems={'center'} spacing={1}>
                                        <Grid item>{'Open in new tab'}</Grid>
                                        <span> </span>
                                        <Render condition={!!_url}>
                                            <Grid item>
                                                <Icon
                                                    icon={ICONS.NEW_WINDOW}
                                                    color={'#fff'}
                                                    width="15"
                                                />
                                            </Grid>
                                        </Render>
                                    </Grid>
                                }
                            >
                                <IconButton
                                    component={MuiLink}
                                    href={_url}
                                    target={'_blank'}
                                    disabled={!_url}
                                    size={'small'}
                                >
                                    <Icon icon={ICONS.NEW_WINDOW} color={'#fff'} width="20" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <Grid item onClick={stopPropagation} onFocus={stopPropagation}>
                            <Tooltip title={'Edit'}>
                                <IconButton
                                    onClick={() => history.push(configurationRoute)}
                                    size={'small'}
                                >
                                    <Icon icon={ICONS.PENCIL} color={'#fff'} width="20" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </div>
            </CardContent>
        </Card>
    );
};
