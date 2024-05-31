import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DialogContextProvider>
          <NamespacesGuardWrapper>
            <DataContextProvider>
              <DynamicDataContextProvider>
                <PageView />
              </DynamicDataContextProvider>
            </DataContextProvider>
          </NamespacesGuardWrapper>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
