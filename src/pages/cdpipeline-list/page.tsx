import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { FilterContextProvider } from '../../providers/Filter/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { matchFunctions, permissionsToCheckConfig } from './constants';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
          <FilterContextProvider
            entityID={`ENVIRONMENT_LIST::${getDefaultNamespace()}`}
            matchFunctions={matchFunctions}
            saveToLocalStorage
          >
            <DynamicDataContextProvider>
              <PageView />
            </DynamicDataContextProvider>
          </FilterContextProvider>
        </PermissionsContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
