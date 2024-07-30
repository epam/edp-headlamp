import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface GitServerSpec {
  gitHost: string;
  gitProvider: string;
  gitUser: string;
  httpsPort: number;
  nameSshKeySecret: string;
  sshPort: number;
  skipWebhookSSLVerification?: boolean;
  webhookUrl: string;
}

export interface GitServerStatus {
  connected?: boolean;
  error?: string;
}

export interface GitServerKubeObjectInterface extends KubeObjectInterface {
  spec: GitServerSpec;
  status: GitServerStatus;
}
