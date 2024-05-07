import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { matchFunctions } from './constants';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <NamespacesGuardWrapper>
          <FilterContextProvider
            entityID={`PIPELINE_RUN_LIST_OVERVIEW::${getDefaultNamespace()}`}
            matchFunctions={matchFunctions}
            saveToLocalStorage
          >
            <ResourceActionListContextProvider>
              <PageView />
            </ResourceActionListContextProvider>
          </FilterContextProvider>
        </NamespacesGuardWrapper>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
