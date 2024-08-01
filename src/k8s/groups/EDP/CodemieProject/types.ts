import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CodemieProjectKubeObjectInterface extends KubeObjectInterface {
  spec: {
    codemieRef: {
      kind: 'Codemie';
      name: string;
    };
    name: string;
  };
}
