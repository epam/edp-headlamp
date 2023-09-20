import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { ViewModeContextProvider } from '../../providers/ViewMode';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <ViewModeContextProvider entityID={'overview'}>
                <PageView />
            </ViewModeContextProvider>
        </PageLogicWrapper>
    );
}
