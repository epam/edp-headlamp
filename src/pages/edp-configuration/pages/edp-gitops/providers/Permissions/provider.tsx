import React from 'react';
import { EDPCodebaseKubeObject } from '../../../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../../../../../k8s/EDPCodebase/config';
import { ValueOf } from '../../../../../../types/global';
import { PermissionList } from '../../../../../../types/permissions';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

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
    codebase: {
      create: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const createCheck = await CodebaseInstance.getAuthorization('create');

      setPermissions({
        codebase: {
          create: createCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
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
