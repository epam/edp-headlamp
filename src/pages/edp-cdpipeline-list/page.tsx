import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <DialogContextProvider>
                <FilterContextProvider>
                    <PageView />
                </FilterContextProvider>
            </DialogContextProvider>
        </PageLogicWrapper>
    );
}
