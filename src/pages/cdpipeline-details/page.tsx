import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { FilterContextProvider } from '../../providers/Filter/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { matchFunctions, permissionsToCheckConfig } from './constants';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <ResourceActionListContextProvider>
          <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
            <FilterContextProvider
              entityID={`CDPIPELINE_OVERVIEW::${getDefaultNamespace()}`}
              matchFunctions={matchFunctions}
              saveToLocalStorage={false}
            >
              <DynamicDataContextProvider>
                <PageView />
              </DynamicDataContextProvider>
            </FilterContextProvider>
          </PermissionsContextProvider>
        </ResourceActionListContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
