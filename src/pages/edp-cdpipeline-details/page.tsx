import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { matchFunctions } from './constants';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DialogContextProvider>
          <ResourceActionListContextProvider>
            <NamespacesGuardWrapper>
              <FilterContextProvider
                entityID={`CDPIPELINE_OVERVIEW::${getDefaultNamespace()}`}
                matchFunctions={matchFunctions}
                saveToLocalStorage={false}
              >
                <DynamicDataContextProvider>
                  <PageView />
                </DynamicDataContextProvider>
              </FilterContextProvider>
            </NamespacesGuardWrapper>
          </ResourceActionListContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
