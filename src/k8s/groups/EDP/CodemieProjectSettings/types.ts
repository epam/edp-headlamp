import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CodemieProjectSettingsKubeObjectInterface extends KubeObjectInterface {
  spec: {
    alias: string;
    codemieRef: {
      kind: string;
      name: string;
    };
    gitCredential: {
      secretRef: {
        name: string;
        secretKey: string;
      };
      tokenName: string;
      url: string;
    };
    projectName: string;
    type: string;
  };
}
