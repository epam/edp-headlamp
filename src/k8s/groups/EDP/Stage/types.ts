import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface StageSpecQualityGatesInterface {
  autotestName: string | null;
  branchName: string | null;
  qualityGateType: string;
  stepName: string;
}

export interface StageSpecInterface {
  cdPipeline: string;
  description: string;
  name: string;
  order: number;
  qualityGates: StageSpecQualityGatesInterface[];
  source: {
    library: {
      branch: string;
      name: string;
    } | null;
    type: string;
  };
  triggerType: string;
  triggerTemplate: string;
  cleanTemplate: string;
  namespace: string;
  clusterName: string;
}

export interface StageStatusInterface {
  action: string;
  available: boolean;
  detailed_message: string;
  last_time_updated: string;
  result: string;
  shouldBeHandled: boolean;
  status: string;
  username: string;
  value: string;
}

export interface StageKubeObjectInterface extends KubeObjectInterface {
  spec: StageSpecInterface;
  status: StageStatusInterface;
}

export interface StreamCDPipelineStagesByCDPipelineNameProps {
  namespace: string;
  CDPipelineMetadataName: string;
  dataHandler: (data: StageKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}

export interface StreamCDPipelineStageProps {
  namespace: string;
  dataHandler: (data: StageKubeObjectInterface) => void;
  errorHandler: (err: Error) => void;
  stageMetadataName: string;
}
