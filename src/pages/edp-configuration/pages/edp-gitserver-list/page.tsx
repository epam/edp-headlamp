import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <DynamicDataContextProvider>
          <PageView />
        </DynamicDataContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
