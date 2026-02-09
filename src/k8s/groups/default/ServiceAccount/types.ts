import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface ServiceAccountKubeObjectInterface extends KubeObjectInterface {
  data: any;
}

export interface StreamServiceAccountsProps {
  namespace: string;
  dataHandler: (data: ServiceAccountKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
