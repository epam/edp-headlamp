import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { TaskKubeObjectConfig } from './config';
import { TaskKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = TaskKubeObjectConfig;

export class TaskKubeObject extends K8s.cluster.makeKubeObject<TaskKubeObjectInterface>(
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
