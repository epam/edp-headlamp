import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { TabsContextProvider } from '../../providers/Tabs/provider';
import { permissionsToCheckConfig } from './constants';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
          <DynamicDataContextProvider>
            <DataContextProvider>
              <TabsContextProvider initialTabIdx={0} rememberLastTab id="component-page">
                <PageView />
              </TabsContextProvider>
            </DataContextProvider>
          </DynamicDataContextProvider>
        </PermissionsContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
