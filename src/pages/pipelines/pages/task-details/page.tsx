import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../../../providers/Permissions/provider';
import { TabsContextProvider } from '../../../../providers/Tabs/provider';
import { permissionsToCheckConfig } from './constants';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <TabsContextProvider initialTabIdx={0} rememberLastTab id="task-details-page">
            <PageView />
          </TabsContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
