import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { matchFunctions } from './constants';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <FilterContextProvider
          entityID={`CODEBASE_LIST::${getDefaultNamespace()}`}
          matchFunctions={matchFunctions}
          saveToLocalStorage
        >
          <NamespacesGuardWrapper>
            <PageView />
          </NamespacesGuardWrapper>
        </FilterContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
