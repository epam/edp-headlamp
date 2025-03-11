import React from 'react';
import { useLocation } from 'react-router-dom';
import { PageLogicWrapper } from '../../../../components/PageLogicWrapper';
import { DialogContextProvider } from '../../../../providers/Dialog/provider';
import { PermissionsContextProvider } from '../../../../providers/Permissions/provider';
import { ResourceActionListContextProvider } from '../../../../providers/ResourceActionList/provider';
import { TabsContextProvider } from '../../../../providers/Tabs/provider';
import { permissionsToCheckConfig } from './constants';
import { DynamicDataContextProvider } from './providers/DynamicData/provider';
import { PageView } from './view';

export default function () {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParamTaskRun = queryParams.get('taskRun');

  return (
    <PageLogicWrapper>
      <PermissionsContextProvider permissionConfigs={permissionsToCheckConfig}>
        <DialogContextProvider>
          <TabsContextProvider
            id="pipelinerun-details-page"
            initialTabIdx={!!queryParamTaskRun ? 1 : 0}
            rememberLastTab={!queryParamTaskRun}
          >
            <ResourceActionListContextProvider>
              <DynamicDataContextProvider>
                <PageView />
              </DynamicDataContextProvider>
            </ResourceActionListContextProvider>
          </TabsContextProvider>
        </DialogContextProvider>
      </PermissionsContextProvider>
    </PageLogicWrapper>
  );
}
