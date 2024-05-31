import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <NamespacesGuardWrapper>
        <PermissionsContextProvider>
          <DialogContextProvider>
            <ResourceActionListContextProvider>
              <PageView />
            </ResourceActionListContextProvider>
          </DialogContextProvider>
        </PermissionsContextProvider>
      </NamespacesGuardWrapper>
    </PageLogicWrapper>
  );
}
