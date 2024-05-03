import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog';
import { NamespacesGuardWrapper } from '../../providers/NamespacesGuardWrapper';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <NamespacesGuardWrapper>
          <ResourceActionListContextProvider>
            <PageView />
          </ResourceActionListContextProvider>
        </NamespacesGuardWrapper>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
