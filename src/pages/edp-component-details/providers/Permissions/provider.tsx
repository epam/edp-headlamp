import React from 'react';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectConfig } from '../../../../k8s/EDPCodebase/config';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectConfig } from '../../../../k8s/EDPCodebaseBranch/config';
import { PipelineRunKubeObject } from '../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectConfig } from '../../../../k8s/PipelineRun/config';
import { ValueOf } from '../../../../types/global';
import { PermissionList } from '../../../../types/permissions';
import { getDefaultNamespace } from '../../../../utils/getDefaultNamespace';
import { permissionChecks } from '../../constants';
import { PermissionsContext } from './context';

const PipelineRunInstance = new PipelineRunKubeObject({
  apiVersion: `${PipelineRunKubeObjectConfig.group}/${PipelineRunKubeObjectConfig.version}`,
  kind: PipelineRunKubeObjectConfig.kind,
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

const CodebaseBranchInstance = new EDPCodebaseBranchKubeObject({
  apiVersion: `${EDPCodebaseBranchKubeObjectConfig.group}/${EDPCodebaseBranchKubeObjectConfig.version}`,
  kind: EDPCodebaseBranchKubeObjectConfig.kind,
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
    codebase: {
      update: false,
      delete: false,
    },
    codebaseBranch: {
      create: false,
      delete: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const pipelineRunCreateCheck = await PipelineRunInstance.getAuthorization('create');
      const pipelineRunUpdateCheck = await PipelineRunInstance.getAuthorization('update');
      const pipelineRunDeleteCheck = await PipelineRunInstance.getAuthorization('delete');

      const codebaseUpdateCheck = await CodebaseInstance.getAuthorization('update');
      const codebaseDeleteCheck = await CodebaseInstance.getAuthorization('delete');

      const codebaseBranchCreateCheck = await CodebaseBranchInstance.getAuthorization('create');
      const codebaseBranchDeleteCheck = await CodebaseBranchInstance.getAuthorization('delete');

      setPermissions({
        pipelineRun: {
          create: pipelineRunCreateCheck?.status?.allowed || false,
          update: pipelineRunUpdateCheck?.status?.allowed || false,
          delete: pipelineRunDeleteCheck?.status?.allowed || false,
        },
        codebase: {
          update: codebaseUpdateCheck?.status?.allowed || false,
          delete: codebaseDeleteCheck?.status?.allowed || false,
        },
        codebaseBranch: {
          create: codebaseBranchCreateCheck?.status?.allowed || false,
          delete: codebaseBranchDeleteCheck?.status?.allowed || false,
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
      codebase: {
        update: permissions.codebase.update,
        delete: permissions.codebase.delete,
      },
      codebaseBranch: {
        create: permissions.codebaseBranch.create,
        delete: permissions.codebaseBranch.delete,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
