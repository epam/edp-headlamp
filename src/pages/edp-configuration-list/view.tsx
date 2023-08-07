import { Icon } from '@iconify/react';
import { Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { useViewModeContext } from '../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../providers/ViewMode/types';
import { rem } from '../../utils/styling/rem';
import { ConfigurationList } from './components/ConfigurationList';

export const PageView = () => {
    const theme = useTheme();
    const { viewMode, handleChangeViewMode } = useViewModeContext();

    return (
        <PageWrapper>
            <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
                spacing={2}
                style={{ margin: `${rem(24)} 0 ${rem(16)}` }}
            >
                <Grid item>
                    <Typography variant={'h5'}>Configuration</Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={0} alignItems={'center'} justifyContent={'flex-end'}>
                        <Grid item>
                            <IconButton onClick={() => handleChangeViewMode(VIEW_MODES.TABLE)}>
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
                            <IconButton onClick={() => handleChangeViewMode(VIEW_MODES.GRID)}>
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
                    </Grid>
                </Grid>
            </Grid>
            <ConfigurationList />
        </PageWrapper>
    );
};
