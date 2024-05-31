import React from 'react';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectConfig } from '../../../../k8s/EDPCDPipeline/config';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

const CDPipelineInstance = new EDPCDPipelineKubeObject({
  apiVersion: `${EDPCDPipelineKubeObjectConfig.group}/${EDPCDPipelineKubeObjectConfig.version}`,
  kind: EDPCDPipelineKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

const CDPipelineStageInstance = new EDPCDPipelineStageKubeObject({
  apiVersion: `${EDPCDPipelineKubeObjectConfig.group}/${EDPCDPipelineKubeObjectConfig.version}`,
  kind: EDPCDPipelineKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

export const PermissionsContextProvider: React.FC = ({ children }) => {
  const [permissions, setPermissions] = React.useState<
    PermissionList<ValueOf<typeof permissionChecks>>
  >({
    cdPipeline: {
      update: false,
      delete: false,
    },
    stage: {
      create: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const CDPipelineUpdateCheck = await CDPipelineInstance.getAuthorization('update');
      const CDPipelineDeleteCheck = await CDPipelineInstance.getAuthorization('delete');

      const stageCreateCheck = await CDPipelineStageInstance.getAuthorization('create');

      setPermissions({
        cdPipeline: {
          update: CDPipelineUpdateCheck?.status?.allowed || false,
          delete: CDPipelineDeleteCheck?.status?.allowed || false,
        },
        stage: {
          create: stageCreateCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
      cdPipeline: {
        update: permissions.cdPipeline.update,
        delete: permissions.cdPipeline.delete,
      },
      stage: {
        create: permissions.stage.create,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
