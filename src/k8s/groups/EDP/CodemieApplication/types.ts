import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface CodemieApplicationKubeObjectInterface extends KubeObjectInterface {
  spec: {
    applicationCodeConfig: {
      branch: string;
      embeddingsModel: string;
      link: string;
    };
    codemieRef: {
      kind: string;
      name: string;
    };
    description: string;
    indexType: string;
    name: string;
    projectName: string;
    projectSpaceVisible: boolean;
  };
  status: {
    value: string;
    error?: string;
  };
}
