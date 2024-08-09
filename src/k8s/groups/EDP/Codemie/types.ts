import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CodemieKubeObjectInterface extends KubeObjectInterface {
  spec: {
    oidc: {
      secretRef: {
        clientKey: string;
        secretKey: string;
        name: string;
      };
      tokenEndpoint: string;
    };
    url: string;
  };
  status: {
    connected: string;
    error: string;
    user: string;
  };
}
