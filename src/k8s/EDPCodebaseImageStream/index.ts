import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { EDPCodebaseImageStreamKubeObjectConfig } from './config';
import {
  EDPCodebaseImageStreamKubeObjectInterface,
  EDPCodebaseImageStreamSpecInterface,
  EDPCodebaseImageStreamStatusInterface,
} from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = EDPCodebaseImageStreamKubeObjectConfig;

export class EDPCodebaseImageStreamKubeObject extends K8s.cluster.makeKubeObject<EDPCodebaseImageStreamKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): EDPCodebaseImageStreamSpecInterface {
    return this.jsonData!.spec;
  }

  get status(): EDPCodebaseImageStreamStatusInterface {
    return this.jsonData!.status;
  }

  static getList(
    namespace
  ): Promise<KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }
}
