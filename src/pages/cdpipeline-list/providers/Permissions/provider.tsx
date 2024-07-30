import React from 'react';
import { CDPipelineKubeObject } from '../../../../k8s/groups/EDP/CDPipeline';
import { CDPipelineKubeObjectConfig } from '../../../../k8s/groups/EDP/CDPipeline/config';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../../../k8s/groups/EDP/Codebase/config';
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

const CodebaseInstance = new CodebaseKubeObject({
  apiVersion: `${CodebaseKubeObjectConfig.group}/${CodebaseKubeObjectConfig.version}`,
  kind: CodebaseKubeObjectConfig.kind,
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
