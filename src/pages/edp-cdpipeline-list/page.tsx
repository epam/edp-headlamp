import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DialogContextProvider>
          <FilterContextProvider
            entityID={`ENVIRONMENT_LIST::${getDefaultNamespace()}`}
            matchFunctions={null}
            saveToLocalStorage
          >
            <NamespacesGuardWrapper>
              <PageView />
            </NamespacesGuardWrapper>
          </FilterContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
