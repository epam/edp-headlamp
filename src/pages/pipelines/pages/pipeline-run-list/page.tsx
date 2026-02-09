import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../../../providers/Permissions/provider';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList/provider';
import { permissionsToCheckConfig } from './constants';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <ResourceActionListContextProvider>
            <DynamicDataContextProvider>
              <PageView />
            </DynamicDataContextProvider>
          </ResourceActionListContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
