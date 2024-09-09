import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { FilterContextProvider } from '../../../../providers/Filter/provider';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <FilterContextProvider
          entityID={`PIPELINE_LIST::${getDefaultNamespace()}`}
          matchFunctions={undefined}
        >
          <PageView />
        </FilterContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
