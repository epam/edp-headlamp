import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { permissionsToCheckConfig } from './constants';
import { UserWidgetsProvider } from './providers/UserWidgets';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <ResourceActionListContextProvider>
            <UserWidgetsProvider>
              <PageView />
            </UserWidgetsProvider>
          </ResourceActionListContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
