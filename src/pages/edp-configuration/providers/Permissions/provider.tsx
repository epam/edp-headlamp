import React from 'react';
import { SecretKubeObject } from '../../../../k8s/Secret';
import { SecretKubeObjectConfig } from '../../../../k8s/Secret/config';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

const SecretInstance = new SecretKubeObject({
  apiVersion: `${SecretKubeObjectConfig.group}/${SecretKubeObjectConfig.version}`,
  kind: SecretKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

export const PermissionsContextProvider: React.FC = ({ children }) => {
  const [permissions, setPermissions] = React.useState<
    PermissionList<ValueOf<typeof permissionChecks>>
  >({
    secret: {
      create: false,
      update: false,
      delete: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const secretCreateCheck = await SecretInstance.getAuthorization('create');
      const secretUpdateCheck = await SecretInstance.getAuthorization('update');
      const secretDeleteCheck = await SecretInstance.getAuthorization('delete');

      setPermissions({
        secret: {
          create: secretCreateCheck?.status?.allowed || false,
          update: secretUpdateCheck?.status?.allowed || false,
          delete: secretDeleteCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
      secret: {
        create: permissions.secret.update,
        update: permissions.secret.update,
        delete: permissions.secret.delete,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
