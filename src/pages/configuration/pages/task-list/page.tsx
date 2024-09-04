import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { FilterContextProvider } from '../../../../providers/Filter';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PermissionsContextProvider } from '../../providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DialogContextProvider>
          <FilterContextProvider
            entityID={`TASK_LIST::${getDefaultNamespace()}`}
            matchFunctions={undefined}
          >
            <PageView />
          </FilterContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
