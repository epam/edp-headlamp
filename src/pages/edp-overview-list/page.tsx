import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <DialogContextProvider>
                <PageView />
            </DialogContextProvider>
        </PageLogicWrapper>
    );
}
