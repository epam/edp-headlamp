import React from 'react';
import { QuickLinkKubeObject } from '../../../../k8s/QuickLink';
import { QuickLinkKubeObjectConfig } from '../../../../k8s/QuickLink/config';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

const QuickLinkInstance = new QuickLinkKubeObject({
  apiVersion: `${QuickLinkKubeObjectConfig.group}/${QuickLinkKubeObjectConfig.version}`,
  kind: QuickLinkKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

export const PermissionsContextProvider: React.FC = ({ children }) => {
  const [permissions, setPermissions] = React.useState<
    PermissionList<ValueOf<typeof permissionChecks>>
  >({
    quickLink: {
      create: false,
      delete: false,
      update: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const createCheck = await QuickLinkInstance.getAuthorization('create');
      const deleteCheck = await QuickLinkInstance.getAuthorization('delete');
      const updateCheck = await QuickLinkInstance.getAuthorization('update');

      setPermissions({
        quickLink: {
          create: createCheck?.status?.allowed || false,
          delete: deleteCheck?.status?.allowed || false,
          update: updateCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
      quickLink: {
        create: permissions.quickLink.create,
        delete: permissions.quickLink.delete,
        update: permissions.quickLink.update,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
