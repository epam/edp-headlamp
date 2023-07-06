import { Icon } from '@iconify/react';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { ICONS } from '../../constants/icons';
import { useViewModeContext } from '../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../providers/ViewMode/types';
import { ConfigurationList } from './components/ConfigurationList/view';
import { useStyles } from './styles';

export const PageView = () => {
    const theme = useTheme();
    const classes = useStyles();
    const { viewMode, handleChangeViewMode } = useViewModeContext();

    return (
        <PageWrapper>
            <SectionBox
                title={
                    <SectionFilterHeader
                        // @ts-ignore
                        title={
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'h5'}>Configuration</Typography>
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
                <ConfigurationList viewMode={viewMode} />
            </SectionBox>
        </PageWrapper>
    );
};
