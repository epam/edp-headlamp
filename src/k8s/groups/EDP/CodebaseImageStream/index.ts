import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { CodebaseImageStreamKubeObjectConfig } from './config';
import { CodebaseImageStreamKubeObjectInterface } from './types';

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

  get spec(): CodebaseImageStreamKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): CodebaseImageStreamKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }
}
