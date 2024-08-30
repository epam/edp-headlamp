import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DialogContextProvider>
          <ResourceActionListContextProvider>
            <PageView />
          </ResourceActionListContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
