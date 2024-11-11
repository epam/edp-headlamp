import React from 'react';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { TabsContextProvider } from '../../../../providers/Tabs/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <DialogContextProvider>
        <TabsContextProvider initialTabIdx={0} rememberLastTab id="pipeline-details-page">
          <PageView />
        </TabsContextProvider>
      </DialogContextProvider>
    </PageLogicWrapper>
  );
}
