import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { FilterContextProvider } from '../../providers/Filter';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ViewModeContextProvider } from '../../providers/ViewMode';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <ViewModeContextProvider entityID={'marketplace'}>
        <DialogContextProvider>
          <FilterContextProvider>
            <NamespacesGuardWrapper>
              <PageView />
            </NamespacesGuardWrapper>
          </FilterContextProvider>
        </DialogContextProvider>
      </ViewModeContextProvider>
    </PageLogicWrapper>
  );
}
