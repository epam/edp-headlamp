import React from 'react';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectConfig } from '../../../../k8s/EDPCDPipeline/config';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../../../k8s/EDPCodebase/config';
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

const CodebaseInstance = new EDPCodebaseKubeObject({
  apiVersion: `${EDPCodebaseKubeObjectConfig.group}/${EDPCodebaseKubeObjectConfig.version}`,
  kind: EDPCodebaseKubeObjectConfig.kind,
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
      create: false,
      update: false,
      delete: false,
    },
    codebase: {
      create: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const cdPipelineCreateCheck = await CDPipelineInstance.getAuthorization('create');
      const cdPipelineUpdateCheck = await CDPipelineInstance.getAuthorization('update');
      const cdPipelineDeleteCheck = await CDPipelineInstance.getAuthorization('delete');

      const codebaseCreateCheck = await CodebaseInstance.getAuthorization('create');

      setPermissions({
        cdPipeline: {
          create: cdPipelineCreateCheck?.status?.allowed || false,
          update: cdPipelineUpdateCheck?.status?.allowed || false,
          delete: cdPipelineDeleteCheck?.status?.allowed || false,
        },
        codebase: {
          create: codebaseCreateCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
      cdPipeline: {
        create: permissions.cdPipeline.create,
        update: permissions.cdPipeline.update,
        delete: permissions.cdPipeline.delete,
      },
      codebase: {
        create: permissions.codebase.create,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
