import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { searchFunction } from '../../../../providers/Filter/constants';
import { FilterContextProvider } from '../../../../providers/Filter/provider';
import { PermissionsContextProvider } from '../../../../providers/Permissions/provider';
import { TabsContextProvider } from '../../../../providers/Tabs/provider';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionsToCheckConfig } from './constants';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <FilterContextProvider
            entityID={`PIPELINE_RUN_LIST_OVERVIEW::${getDefaultNamespace()}`}
            matchFunctions={{
              search: searchFunction,
            }}
            saveToLocalStorage
          >
            <TabsContextProvider initialTabIdx={0} rememberLastTab id="pipeline-details-page">
              <PageView />
            </TabsContextProvider>
          </FilterContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
