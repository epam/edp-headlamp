import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { TemplateKubeObjectConfig } from './config';
import { TemplateKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = TemplateKubeObjectConfig;

export class TemplateKubeObject extends K8s.cluster.makeKubeObject<TemplateKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): TemplateKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  static getList(namespace: string): Promise<KubeObjectListInterface<TemplateKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return ApiProxy.request(url);
  }
}
