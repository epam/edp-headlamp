import { Grid } from '@material-ui/core';
import React from 'react';
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
    const [data] = EDPTemplateKubeObject.useList();

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
                    data={data}
                    activeTemplate={activeTemplate}
                    handleTemplateClick={handleTemplateClick}
                />
            ) : viewMode === VIEW_MODES.GRID ? (
                <Grid container spacing={2}>
                    {data &&
                        data.map(item => {
                            const key = `marketplace-item-${item?.spec?.displayName}`;

                            return (
                                <Grid key={key} item xs={4}>
                                    <TemplateCard
                                        activeTemplate={activeTemplate}
                                        handleTemplateClick={handleTemplateClick}
                                        template={item}
                                    />
                                </Grid>
                            );
                        })}
                </Grid>
            ) : null}
        </>
    );
};
