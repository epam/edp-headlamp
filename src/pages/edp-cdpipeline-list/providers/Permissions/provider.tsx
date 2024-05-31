import React from 'react';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectConfig } from '../../../../k8s/EDPCDPipeline/config';
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

export const PermissionsContextProvider: React.FC = ({ children }) => {
  const [permissions, setPermissions] = React.useState<
    PermissionList<ValueOf<typeof permissionChecks>>
  >({
    cdPipeline: {
      create: false,
      update: false,
      delete: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const createCheck = await CDPipelineInstance.getAuthorization('create');
      const updateCheck = await CDPipelineInstance.getAuthorization('update');
      const deleteCheck = await CDPipelineInstance.getAuthorization('delete');

      setPermissions({
        cdPipeline: {
          create: createCheck?.status?.allowed || false,
          update: updateCheck?.status?.allowed || false,
          delete: deleteCheck?.status?.allowed || false,
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
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
