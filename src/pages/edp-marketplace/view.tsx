import { Icon } from '@iconify/react';
import { Router } from '@kinvolk/headlamp-plugin/lib';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { EmptyList } from '../../components/EmptyList';
import { PageWrapper } from '../../components/PageWrapper';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPGitServerKubeObject } from '../../k8s/EDPGitServer';
import { useViewModeContext } from '../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../providers/ViewMode/types';
import { routeEDPGitServerList } from '../edp-configuration/pages/edp-gitserver-list/route';
import { MarketplaceList } from './components/MarketplaceList';
import { useStyles } from './styles';

export const PageView = () => {
    const theme = useTheme();
    const classes = useStyles();
    const { viewMode, handleChangeViewMode } = useViewModeContext();

    const [gitServers] = EDPGitServerKubeObject.useList();
    const gitServersIsLoading = gitServers === null;
    const noGitServers = !gitServers?.length;
    const history = useHistory();
    const gitServersConfigurationPageRoute = Router.createRouteURL(routeEDPGitServerList.path);

    return (
        <PageWrapper>
            <SectionBox
                title={
                    <SectionFilterHeader
                        // @ts-ignore
                        title={
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'h1'}>Marketplace</Typography>
                                </Grid>
                            </Grid>
                        }
                        actions={[
                            <Grid
                                container
                                spacing={0}
                                alignItems={'center'}
                                justifyContent={'flex-end'}
                            >
                                <Grid item>
                                    <IconButton
                                        onClick={() => handleChangeViewMode(VIEW_MODES.TABLE)}
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
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        onClick={() => handleChangeViewMode(VIEW_MODES.GRID)}
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
                                </Grid>
                            </Grid>,
                        ]}
                        headerStyle="label"
                    />
                }
                outterBoxProps={{
                    className: classes.sectionRoot,
                }}
            >
                {(gitServersIsLoading || !noGitServers) && <MarketplaceList />}
                {!gitServersIsLoading && noGitServers && (
                    <EmptyList
                        customText={'No Git Servers Connected.'}
                        linkText={'Click here to add a Git Server.'}
                        handleClick={() => history.push(gitServersConfigurationPageRoute)}
                    />
                )}
            </SectionBox>
        </PageWrapper>
    );
};
