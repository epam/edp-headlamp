import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
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
              <PageView />
            </DataContextProvider>
          </DynamicDataContextProvider>
        </PermissionsContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
