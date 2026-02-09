import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { QuickLinkKubeObjectConfig } from './config';
import { QuickLinkKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = QuickLinkKubeObjectConfig;

export class QuickLinkKubeObject extends K8s.cluster.makeKubeObject<QuickLinkKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): QuickLinkKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  static getList(
    namespace: string
  ): Promise<KubeObjectListInterface<QuickLinkKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }
}
