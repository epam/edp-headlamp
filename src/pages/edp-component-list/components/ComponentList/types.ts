import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface ComponentListProps {
  noGitServers: boolean;
}

export type ComponentsToDeleteConflicts = Map<
  string,
  {
    component: EDPCodebaseKubeObjectInterface;
    pipelines: EDPCDPipelineKubeObjectInterface[];
    stages: EDPCDPipelineStageKubeObjectInterface[];
  }
>;

export type ComponentsToDelete = Map<string, EDPCodebaseKubeObjectInterface>;
