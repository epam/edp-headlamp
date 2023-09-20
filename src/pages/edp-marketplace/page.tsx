import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { ViewModeContextProvider } from '../../providers/ViewMode';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <ViewModeContextProvider entityID={'marketplace'}>
                <DialogContextProvider>
                    <PageView />
                </DialogContextProvider>
            </ViewModeContextProvider>
        </PageLogicWrapper>
    );
}
