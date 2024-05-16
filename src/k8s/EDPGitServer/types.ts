import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface EDPGitServerSpec {
  gitHost: string;
  gitProvider: string;
  gitUser: string;
  httpsPort: number;
  nameSshKeySecret: string;
  sshPort: number;
  skipWebhookSSLVerification?: boolean;
  webhookUrl: string;
}

export interface EDPGitServerStatus {
  connected?: boolean;
  error?: string;
}

export interface EDPGitServerKubeObjectInterface extends KubeObjectInterface {
  spec: EDPGitServerSpec;
  status: EDPGitServerStatus;
}
