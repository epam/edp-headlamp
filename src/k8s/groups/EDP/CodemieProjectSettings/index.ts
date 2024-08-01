import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { CodemieProjectSettingsKubeObjectConfig } from './config';
import { CodemieProjectSettingsKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodemieProjectSettingsKubeObjectConfig;

export class CodemieProjectSettingsKubeObject extends K8s.cluster.makeKubeObject<CodemieProjectSettingsKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodemieProjectSettingsKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }
}
