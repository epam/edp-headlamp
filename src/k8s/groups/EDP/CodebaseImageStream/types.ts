import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CodebaseImageStreamSpecTag {
  created: string;
  name: string;
}

export interface CodebaseImageStreamSpecInterface {
  codebase: string;
  imageName: string;
  tags: CodebaseImageStreamSpecTag[] | null;
}

export interface CodebaseImageStreamStatusInterface {
  detailedMessage: string;
  failureCount: number;
}

export interface CodebaseImageStreamKubeObjectInterface extends KubeObjectInterface {
  spec: CodebaseImageStreamSpecInterface;
  status: CodebaseImageStreamStatusInterface;
}
