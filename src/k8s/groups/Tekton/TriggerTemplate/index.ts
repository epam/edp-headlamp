import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { TriggerTemplateKubeObjectConfig } from './config';
import { TriggerTemplateKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = TriggerTemplateKubeObjectConfig;

export class TriggerTemplateKubeObject extends K8s.cluster.makeKubeObject<TriggerTemplateKubeObjectInterface>(
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

  static getList(
    namespace: string
  ): Promise<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }

  static getListByTypeLabel(
    namespace: string,
    typeLabel: string
  ): Promise<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=app.edp.epam.com/pipelinetype=${typeLabel}`;

    return ApiProxy.request(url);
  }

  static getItemByName(
    namespace: string,
    name: string
  ): Promise<TriggerTemplateKubeObjectInterface> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}/${name}`;

    return ApiProxy.request(url);
  }
}
