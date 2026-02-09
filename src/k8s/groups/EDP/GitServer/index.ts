import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { GitServerKubeObjectConfig } from './config';
import { GitServerKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = GitServerKubeObjectConfig;

export class GitServerKubeObject extends K8s.cluster.makeKubeObject<GitServerKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): GitServerKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): GitServerKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }

  static getStatusIcon(connected: boolean | undefined): [string, string, boolean?] {
    if (connected === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    if (connected) {
      return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];
    }
    return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];
  }

  static getList(
    namespace: string
  ): Promise<KubeObjectListInterface<GitServerKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }

  static getByName(name: string, namespace: string): Promise<GitServerKubeObjectInterface> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}/${name}`;

    return ApiProxy.request(url);
  }
}
