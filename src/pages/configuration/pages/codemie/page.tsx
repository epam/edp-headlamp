import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DynamicDataContextProvider>
          <DialogContextProvider>
            <PageView />
          </DialogContextProvider>
        </DynamicDataContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
