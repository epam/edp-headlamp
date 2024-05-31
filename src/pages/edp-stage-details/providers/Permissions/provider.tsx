import React from 'react';
import { ApplicationKubeObject } from '../../../../k8s/Application';
import { ApplicationKubeObjectConfig } from '../../../../k8s/Application/config';
import { EDPCDPipelineKubeObjectConfig } from '../../../../k8s/EDPCDPipeline/config';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
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

const CDPipelineStageInstance = new EDPCDPipelineStageKubeObject({
  apiVersion: `${EDPCDPipelineKubeObjectConfig.group}/${EDPCDPipelineKubeObjectConfig.version}`,
  kind: EDPCDPipelineKubeObjectConfig.kind,
  // @ts-ignore
  metadata: {
    namespace: getDefaultNamespace(),
  },
});

const ArgoApplicationInstance = new ApplicationKubeObject({
  apiVersion: `${ApplicationKubeObjectConfig.group}/${ApplicationKubeObjectConfig.version}`,
  kind: ApplicationKubeObjectConfig.kind,
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
    },
    stage: {
      update: false,
      delete: false,
    },
    argoApplication: {
      delete: false,
    },
  });

  React.useEffect(() => {
    (async () => {
      const pipelineRunCreateCheck = await PipelineRunInstance.getAuthorization('create');
      const pipelineRunUpdateCheck = await PipelineRunInstance.getAuthorization('update');
      const pipelineRunDeleteCheck = await PipelineRunInstance.getAuthorization('delete');

      const stageUpdateCheck = await CDPipelineStageInstance.getAuthorization('update');
      const stageDeleteCheck = await CDPipelineStageInstance.getAuthorization('delete');

      const argoAppDeleteCheck = await ArgoApplicationInstance.getAuthorization('delete');

      setPermissions({
        pipelineRun: {
          create: pipelineRunCreateCheck?.status?.allowed || false,
          update: pipelineRunUpdateCheck?.status?.allowed || false,
          delete: pipelineRunDeleteCheck?.status?.allowed || false,
        },
        stage: {
          update: stageUpdateCheck?.status?.allowed || false,
          delete: stageDeleteCheck?.status?.allowed || false,
        },
        argoApplication: {
          delete: argoAppDeleteCheck?.status?.allowed || false,
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
      stage: {
        update: permissions.stage.update,
        delete: permissions.stage.delete,
      },
      argoApplication: {
        delete: permissions.argoApplication.delete,
      },
    }),
    [permissions]
  );

  return (
    <PermissionsContext.Provider value={DataContextValue}>{children}</PermissionsContext.Provider>
  );
};
