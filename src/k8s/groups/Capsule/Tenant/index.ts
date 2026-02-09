import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { TenantKubeObjectConfig } from './config';
import { TenantKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = TenantKubeObjectConfig;

export class TenantKubeObject extends K8s.cluster.makeKubeObject<TenantKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): any {
    return this.jsonData!.spec;
  }

  get status(): any {
    return this.jsonData!.status;
  }
}
