import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { CodemieKubeObjectConfig } from './config';
import { CodemieKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodemieKubeObjectConfig;

export class CodemieKubeObject extends K8s.cluster.makeKubeObject<CodemieKubeObjectInterface>(singularForm) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodemieKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }
}
