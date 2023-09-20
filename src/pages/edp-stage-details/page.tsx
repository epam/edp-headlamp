import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <DialogContextProvider>
                <ResourceActionListContextProvider>
                    <DataContextProvider>
                        <DynamicDataContextProvider>
                            <PageView />
                        </DynamicDataContextProvider>
                    </DataContextProvider>
                </ResourceActionListContextProvider>
            </DialogContextProvider>
        </PageLogicWrapper>
    );
}
