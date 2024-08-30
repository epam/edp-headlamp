import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { FilterContextProvider } from '../../providers/Filter';
import { ViewModeContextProvider } from '../../providers/ViewMode';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <ViewModeContextProvider entityID={'marketplace'}>
          <DialogContextProvider>
            <FilterContextProvider
              entityID={`MARKETPLACE_LIST::${getDefaultNamespace()}`}
              matchFunctions={null}
              saveToLocalStorage
            >
              <PageView />
            </FilterContextProvider>
          </DialogContextProvider>
        </ViewModeContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
