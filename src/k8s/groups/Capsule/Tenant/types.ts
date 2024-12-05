import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export interface TenantStatus {
  namespaces: string[];
  size: number;
  state: string;
}

export interface IngressOptions {
  hostnameCollisionScope: string;
}

export interface Limit {
  default: {
    cpu: string;
    memory: string;
  };
  defaultRequest: {
    cpu: string;
    memory: string;
  };
  type: string;
}

export interface LimitRange {
  limits: Limit[];
}

export interface NamespaceOptions {
  quota: number;
}

export interface Owner {
  clusterRoles: string[];
  kind: string;
  name: string;
}

export interface ResourceQuota {
  hard: {
    [key: string]: string;
  };
}

export interface TenantSpec {
  ingressOptions: IngressOptions;
  limitRanges: {
    items: LimitRange[];
  };
  namespaceOptions: NamespaceOptions;
  networkPolicies: Record<string, unknown>;
  owners: Owner[];
  resourceQuotas: {
    items: ResourceQuota[];
    scope: string;
  };
}

export interface TenantKubeObjectInterface extends KubeObjectInterface {
  status: TenantStatus;
  spec: TenantSpec;
}
