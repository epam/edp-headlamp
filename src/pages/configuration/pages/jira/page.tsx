import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../../../providers/Permissions/provider';
import { pagePermissionsToCheck } from './constants';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={pagePermissionsToCheck}>
        <DialogContextProvider>
          <PageView />
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
