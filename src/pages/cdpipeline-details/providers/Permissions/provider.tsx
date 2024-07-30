import React from 'react';
import { CDPipelineKubeObject } from '../../../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../../../k8s/groups/EDP/CDPipeline/config';
import { StageKubeObject } from '../../../../k8s/groups/EDP/Stage';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

const CDPipelineInstance = new CDPipelineKubeObject({
  apiVersion: `${CDPipelineKubeObjectConfig.group}/${CDPipelineKubeObjectConfig.version}`,
  kind: CDPipelineKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

const CDPipelineStageInstance = new StageKubeObject({
  apiVersion: `${CDPipelineKubeObjectConfig.group}/${CDPipelineKubeObjectConfig.version}`,
  kind: CDPipelineKubeObjectConfig.kind,
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
