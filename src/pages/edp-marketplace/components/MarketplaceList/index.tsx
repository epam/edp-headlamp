import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { Grid } from '@material-ui/core';
import React from 'react';
import { DataGrid } from '../../../../components/DataGrid';
import { EmptyList } from '../../../../components/EmptyList';
import { Resources } from '../../../../icons/sprites/Resources';
import { EDPTemplateKubeObject } from '../../../../k8s/EDPTemplate';
import { EDPTemplateKubeObjectInterface } from '../../../../k8s/EDPTemplate/types';
import { useViewModeContext } from '../../../../providers/ViewMode/hooks';
import { VIEW_MODES } from '../../../../providers/ViewMode/types';
import { BottomDrawer } from './components/BottomDrawer';
import { TemplateCard } from './components/TemplateCard';
import { TemplatesTable } from './components/TemplatesTable';

export const MarketplaceList = () => {
    const { viewMode } = useViewModeContext();
    const [items, error] = EDPTemplateKubeObject.useList();
    const filterFunction = Utils.useFilterFunc([
        '.jsonData.spec.displayName',
        '.jsonData.metadata.name',
    ]);
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
    const [activeTemplate, setActiveTemplate] =
        React.useState<EDPTemplateKubeObjectInterface>(null);

    const toggleDrawer = (event: React.SyntheticEvent, open: boolean) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open);
        if (!open) {
            setActiveTemplate(null);
        }
    };

    const handleTemplateClick = (
        event: React.SyntheticEvent,
        template: EDPTemplateKubeObjectInterface
    ) => {
        if (template) {
            setActiveTemplate(template);
            toggleDrawer(event, true);
        } else {
            setActiveTemplate(null);
            toggleDrawer(event, false);
        }
    };

    return (
        <>
            <Resources />
            <BottomDrawer
                activeTemplate={activeTemplate}
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
            />
            {viewMode === VIEW_MODES.TABLE ? (
                <TemplatesTable
                    data={items}
                    activeTemplate={activeTemplate}
                    handleTemplateClick={handleTemplateClick}
                    filterFunction={filterFunction}
                />
            ) : viewMode === VIEW_MODES.GRID ? (
                <DataGrid<EDPTemplateKubeObjectInterface>
                    data={items}
                    error={error}
                    isLoading={items === null}
                    spacing={2}
                    filterFunction={filterFunction}
                    emptyListComponent={<EmptyList missingItemName={'templates'} />}
                    renderItem={item => {
                        const key = `marketplace-item-${item?.spec?.displayName}`;

                        return (
                            <Grid key={key} item xs={12} md={6} lg={4}>
                                <TemplateCard
                                    activeTemplate={activeTemplate}
                                    handleTemplateClick={handleTemplateClick}
                                    template={item}
                                />
                            </Grid>
                        );
                    }}
                />
            ) : null}
        </>
    );
};
