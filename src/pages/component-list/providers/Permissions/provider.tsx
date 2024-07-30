import React from 'react';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectConfig } from '../../../../k8s/groups/EDP/Codebase/config';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

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
    codebase: {
      create: false,
      update: false,
      delete: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const createCheck = await CodebaseInstance.getAuthorization('create');
      const updateCheck = await CodebaseInstance.getAuthorization('update');
      const deleteCheck = await CodebaseInstance.getAuthorization('delete');

      setPermissions({
        codebase: {
          create: createCheck?.status?.allowed || false,
          update: updateCheck?.status?.allowed || false,
          delete: deleteCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
      codebase: {
        create: permissions.codebase.create,
        update: permissions.codebase.update,
        delete: permissions.codebase.delete,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
