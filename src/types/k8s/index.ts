import { KubeMetadata, KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface EDPKubeMetadata
  extends Omit<KubeMetadata, 'uid' | 'creationTimestamp' | 'resourceVersion' | 'selfLink'> {
  finalizers?: string[];
  generation?: number;
  uid?: string;
  creationTimestamp?: string;
  resourceVersion?: string;
  selfLink?: string;
}

export interface EDPKubeObjectInterface extends Omit<KubeObjectInterface, 'metadata'> {
  metadata: EDPKubeMetadata;
}

export interface HeadlampKubeObject<T extends KubeObjectInterface> {
  jsonData: T;
  isNamespaced: boolean;
  kind: string;
  listRoute: string;
  detailsRoute: string;
  pluralName: string;
  metadata: T['metadata'];
  spec: T['spec'];
  status: T['status'];
}

export interface KubeObjectListInterface<T> extends KubeObjectInterface {
  items: T[];
}
