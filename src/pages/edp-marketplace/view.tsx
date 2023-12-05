import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { Grid, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DocLink } from '../../components/DocLink';
import { EmptyList } from '../../components/EmptyList';
import { Filter } from '../../components/Filter';
import { PageWrapper } from '../../components/PageWrapper';
import { Section } from '../../components/Section';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { useViewModeContext } from '../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../providers/ViewMode/types';
import { routeEDPGitServerList } from '../edp-configuration/pages/edp-gitserver-list/route';
import { MarketplaceList } from './components/MarketplaceList';

export const PageView = () => {
    const theme = useTheme();
    const { viewMode, handleChangeViewMode } = useViewModeContext();

    const [gitServers] = EDPGitServerKubeObject.useList();
    const gitServersIsLoading = gitServers === null;
    const noGitServers = !gitServers?.length;
    const history = useHistory();
    const gitServersConfigurationPageRoute = Router.createRouteURL(routeEDPGitServerList.path);

    return (
        <PageWrapper>
            <Section
                title={
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography variant={'h1'}>Marketplace</Typography>
                        </Grid>
                        <Grid item>
                            <DocLink href={EDP_USER_GUIDE.MARKETPLACE_CREATE_APP.url} />
                        </Grid>
                    </Grid>
                }
                description={
                    'Effortlessly scaffold applications using predefined templates crafted for various use cases.'
                }
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid
                            container
                            spacing={2}
                            alignItems={'flex-end'}
                            justifyContent={'flex-end'}
                        >
                            <Grid item>
                                <Filter />
                            </Grid>
                            <Grid item>
                                <Grid
                                    container
                                    spacing={0}
                                    alignItems={'center'}
                                    justifyContent={'flex-end'}
                                >
                                    <Grid item>
                                        <Tooltip title={'List View'}>
                                            <IconButton
                                                onClick={() =>
                                                    handleChangeViewMode(VIEW_MODES.TABLE)
                                                }
                                            >
                                                <Icon
                                                    icon={ICONS.VIEW_TABLE}
                                                    color={
                                                        viewMode === VIEW_MODES.TABLE
                                                            ? theme.palette.primary.main
                                                            : 'inherit'
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title={'Block View'}>
                                            <IconButton
                                                onClick={() =>
                                                    handleChangeViewMode(VIEW_MODES.GRID)
                                                }
                                            >
                                                <Icon
                                                    icon={ICONS.VIEW_GRID}
                                                    color={
                                                        viewMode === VIEW_MODES.GRID
                                                            ? theme.palette.primary.main
                                                            : 'inherit'
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {(gitServersIsLoading || !noGitServers) && <MarketplaceList />}
                        {!gitServersIsLoading && noGitServers && (
                            <EmptyList
                                customText={'No Git Servers Connected.'}
                                linkText={'Click here to add a Git Server.'}
                                handleClick={() => history.push(gitServersConfigurationPageRoute)}
                            />
                        )}
                    </Grid>
                </Grid>
            </Section>
        </PageWrapper>
    );
};
