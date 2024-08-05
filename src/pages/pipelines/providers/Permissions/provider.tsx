import React from 'react';
import { PipelineRunKubeObject } from '../../../../k8s/groups/Tekton/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/groups/Tekton/PipelineRun/config';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { PermissionsContext } from './context';

const permissionChecks = {
  PIPELINE_RUN: 'pipelineRun',
} as const;

const PipelineRunInstance = new PipelineRunKubeObject({
  apiVersion: `${PipelineRunKubeObjectConfig.group}/${PipelineRunKubeObjectConfig.version}`,
  kind: PipelineRunKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

export const PermissionsContextProvider: React.FC = ({ children }) => {
  const [permissions, setPermissions] = React.useState<
    PermissionList<ValueOf<typeof permissionChecks>>
  >({
    pipelineRun: {
      create: false,
      update: false,
      delete: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const createCheck = await PipelineRunInstance.getAuthorization('create');
      const updateCheck = await PipelineRunInstance.getAuthorization('update');
      const deleteCheck = await PipelineRunInstance.getAuthorization('delete');

      setPermissions({
        pipelineRun: {
          create: createCheck?.status?.allowed || false,
          update: updateCheck?.status?.allowed || false,
          delete: deleteCheck?.status?.allowed || false,
        },
      });
    })();
  }, []);

  const DataContextValue = React.useMemo(
    () => ({
      pipelineRun: {
        create: permissions.pipelineRun.create,
        update: permissions.pipelineRun.update,
        delete: permissions.pipelineRun.delete,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
