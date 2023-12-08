import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { ViewModeContextProvider } from '../../providers/ViewMode';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <ViewModeContextProvider entityID={'marketplace'}>
                <DialogContextProvider>
                    <FilterContextProvider>
                        <PageView />
                    </FilterContextProvider>
                </DialogContextProvider>
            </ViewModeContextProvider>
        </PageLogicWrapper>
    );
}
