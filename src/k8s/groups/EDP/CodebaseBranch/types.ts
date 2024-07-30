import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CodebaseBranchSpecInterface {
  branchName: string;
  codebaseName: string;
  fromCommit: string;
  release: boolean;
  releaseJobParams: {
    additionalProperties: string;
  } | null;
  version: string | null;
}

export interface CodebaseBranchStatusInterface {
  action: string;
  build: string;
  detailedMessage: string;
  failureCount: number;
  lastSuccessfulBuild: string;
  lastTimeUpdated: string;
  result: string;
  status: string;
  username: string;
  value: string;
  versionHistory: string[];
}

export interface CodebaseBranchKubeObjectInterface extends KubeObjectInterface {
  spec: CodebaseBranchSpecInterface;
  status: CodebaseBranchStatusInterface;
}
