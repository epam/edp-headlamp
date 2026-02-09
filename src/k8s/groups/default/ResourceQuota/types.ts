import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface ResourceQuotaKubeObjectInterface extends KubeObjectInterface {}

export interface StreamListProps {
  namespace: string;
  tenantNamespace: string;
  dataHandler: (data: ResourceQuotaKubeObjectInterface[]) => void;
  errorHandler: (err: Error) => void;
}
