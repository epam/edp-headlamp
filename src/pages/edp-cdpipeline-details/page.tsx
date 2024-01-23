import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <ResourceActionListContextProvider>
          <NamespacesGuardWrapper>
            <DynamicDataContextProvider>
              <PageView />
            </DynamicDataContextProvider>
          </NamespacesGuardWrapper>
        </ResourceActionListContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
