import { Icon } from '@iconify/react';
import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { SectionBox, SectionFilterHeader } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { DataGrid } from '../../components/DataGrid';
import { DocLink } from '../../components/DocLink';
import { EmptyList } from '../../components/EmptyList';
import { PageWrapper } from '../../components/PageWrapper';
import { EDP_USER_GUIDE } from '../../constants/urls';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { EDPComponentKubeObject } from '../../k8s/EDPComponent';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { useViewModeContext } from '../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../providers/ViewMode/types';
import { ComponentCard } from './components/ComponentCard';
import { EDPComponentList } from './components/EDPComponentList';
import { useStyles } from './styles';

export const PageView = () => {
    const { viewMode, handleChangeViewMode } = useViewModeContext();
    const theme = useTheme();
    const filterFunction = Utils.useFilterFunc();
    const classes = useStyles();
    const [EDPComponents, setEDPComponents] =
        React.useState<EDPComponentKubeObjectInterface[]>(null);
    const [error, setError] = React.useState<unknown>(null);
    EDPComponentKubeObject.useApiList(
        (components: EDPComponentKubeObjectInterface[]) => {
            setEDPComponents(components.filter(el => el.spec.visible));
        },
        error => setError(error)
    );

    return (
        <PageWrapper>
            <SectionBox
                title={
                    <SectionFilterHeader
                        // @ts-ignore
                        title={
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item>
                                    <Typography variant={'h5'}>Overview</Typography>
                                </Grid>
                                <Grid item>
                                    <DocLink href={EDP_USER_GUIDE.OVERVIEW.url} />
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
                {viewMode === VIEW_MODES.TABLE ? (
                    <EDPComponentList EDPComponents={EDPComponents} error={error} />
                ) : viewMode === VIEW_MODES.GRID ? (
                    <DataGrid<EDPComponentKubeObjectInterface>
                        data={EDPComponents}
                        error={error}
                        isLoading={EDPComponents === null}
                        spacing={2}
                        filterFunction={filterFunction}
                        emptyListComponent={<EmptyList missingItemName={'EDPComponents'} />}
                        renderItem={component => {
                            const key = `marketplace-item-${component?.metadata?.uid}`;

                            return (
                                <Grid key={key} item xs={4}>
                                    <ComponentCard component={component} />
                                </Grid>
                            );
                        }}
                    />
                ) : null}
            </SectionBox>
        </PageWrapper>
    );
};
