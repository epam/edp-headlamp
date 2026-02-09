import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { CodemieProjectKubeObjectConfig } from './config';
import { CodemieProjectKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodemieProjectKubeObjectConfig;

export class CodemieProjectKubeObject extends K8s.cluster.makeKubeObject<CodemieProjectKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodemieProjectKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): CodemieProjectKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }
}
