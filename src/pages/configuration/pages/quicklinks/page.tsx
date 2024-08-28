import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog';
import { FilterContextProvider } from '../../../../providers/Filter';
import { NewDialogContextProvider } from '../../../../providers/NewDialog/provider';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <NewDialogContextProvider>
          <DialogContextProvider>
            <FilterContextProvider
              entityID={`QUICK_LINK_LIST::${getDefaultNamespace()}`}
              matchFunctions={null}
              saveToLocalStorage
            >
              <PageView />
            </FilterContextProvider>
          </DialogContextProvider>
        </NewDialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
