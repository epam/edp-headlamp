import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
    return (
        <PageLogicWrapper>
            <DialogContextProvider>
                <ResourceActionListContextProvider>
                    <NamespacesGuardWrapper>
                        <DataContextProvider>
                            <DynamicDataContextProvider>
                                <PageView />
                            </DynamicDataContextProvider>
                        </DataContextProvider>
                    </NamespacesGuardWrapper>
                </ResourceActionListContextProvider>
            </DialogContextProvider>
        </PageLogicWrapper>
    );
}
