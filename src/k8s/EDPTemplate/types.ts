import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface EDPTemplateSpec {
  buildTool: string;
  category?: string;
  description: string;
  displayName: string;
  framework: string;
  icon?: {
    base64data?: string;
    mediatype?: string;
  }[];
  keywords?: string[];
  language: string;
  maintainers?: {
    email: string;
    name: string;
  }[];
  maturity?:
    | 'planning'
    | 'pre-alpha'
    | 'alpha'
    | 'beta'
    | 'stable'
    | 'mature'
    | 'inactive'
    | 'deprecated';
  minEDPVersion?: string;
  source: string;
  type: string;
  version: string;
}

export interface EDPTemplateKubeObjectInterface extends KubeObjectInterface {
  spec: EDPTemplateSpec;
}
