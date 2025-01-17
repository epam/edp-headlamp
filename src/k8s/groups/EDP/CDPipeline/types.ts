import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CDPipelineSpec {
  applications: string[];
  applicationsToPromote: string[] | null;
  deploymentType: string;
  inputDockerStreams: string[];
  name: string;
  description?: string;
}

export interface CDPipelineStatus {
  action: string;
  available: boolean;
  detailed_message: string;
  last_time_updated: string;
  result: string;
  status: string;
  username: string;
  value: string;
}

export interface CDPipelineKubeObjectInterface extends KubeObjectInterface {
  spec: CDPipelineSpec;
  status: CDPipelineStatus;
}

export interface StreamCDPipelineProps {
  namespace: string;
  CDPipelineMetadataName: string;
  dataHandler: (data: CDPipelineKubeObjectInterface) => void;
  errorHandler: (err: Error) => void;
}
