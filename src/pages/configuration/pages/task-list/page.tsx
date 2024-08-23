import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { NewDialogContextProvider } from '../../../../providers/NewDialog/provider';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <NewDialogContextProvider>
          <PageView />
        </NewDialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
