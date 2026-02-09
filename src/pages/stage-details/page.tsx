import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { TabsContextProvider } from '../../providers/Tabs/provider';
import { permissionsToCheckConfig } from './constants';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <ResourceActionListContextProvider>
            <TabsContextProvider initialTabIdx={0} rememberLastTab id="stage-page">
              <DataContextProvider>
                <DynamicDataContextProvider>
                  <PageView />
                </DynamicDataContextProvider>
              </DataContextProvider>
            </TabsContextProvider>
          </ResourceActionListContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
