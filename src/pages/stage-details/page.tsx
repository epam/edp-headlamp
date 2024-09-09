import React from 'react';
import { PageLogicWrapper } from '../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../providers/Dialog/provider';
import { ResourceActionListContextProvider } from '../../providers/ResourceActionList/provider';
import { DataContextProvider } from './providers/Data/provider';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PermissionsContextProvider } from './providers/Permissions/provider';
import { PageView } from './view';

export default function () {
  return (
    <PageLogicWrapper>
      <PermissionsContextProvider>
        <DialogContextProvider>
          <ResourceActionListContextProvider>
            <DataContextProvider>
              <DynamicDataContextProvider>
                <PageView />
              </DynamicDataContextProvider>
            </DataContextProvider>
          </ResourceActionListContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
