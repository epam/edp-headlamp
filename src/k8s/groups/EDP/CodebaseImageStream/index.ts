import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { CodebaseImageStreamKubeObjectConfig } from './config';
import {
  CodebaseImageStreamKubeObjectInterface,
  CodebaseImageStreamSpecInterface,
  CodebaseImageStreamStatusInterface,
} from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodebaseImageStreamKubeObjectConfig;

export class CodebaseImageStreamKubeObject extends K8s.cluster.makeKubeObject<CodebaseImageStreamKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodebaseImageStreamSpecInterface {
    return this.jsonData!.spec;
  }

  get status(): CodebaseImageStreamStatusInterface {
    return this.jsonData!.status;
  }

  static getList(
    namespace: string
  ): Promise<KubeObjectListInterface<CodebaseImageStreamKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }
}
