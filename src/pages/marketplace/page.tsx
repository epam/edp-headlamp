import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { FilterContextProvider } from '../../providers/Filter/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { ViewModeContextProvider } from '../../providers/ViewMode/provider';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { permissionsToCheckConfig } from './constants';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <ViewModeContextProvider entityID={'marketplace'}>
          <DialogContextProvider>
            <FilterContextProvider
              entityID={`MARKETPLACE_LIST::${getDefaultNamespace()}`}
              matchFunctions={null}
              saveToLocalStorage
            >
              <DynamicDataContextProvider>
                <PageView />
              </DynamicDataContextProvider>
            </FilterContextProvider>
          </DialogContextProvider>
        </ViewModeContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
