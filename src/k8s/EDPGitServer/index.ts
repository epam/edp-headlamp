import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../constants/colors';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../types/k8s';
import { EDPGitServerKubeObjectConfig } from './config';
import { EDPGitServerKubeObjectInterface, EDPGitServerSpec, EDPGitServerStatus } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = EDPGitServerKubeObjectConfig;

export class EDPGitServerKubeObject extends K8s.cluster.makeKubeObject<EDPGitServerKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): EDPGitServerSpec {
    return this.jsonData!.spec;
  }

  get status(): EDPGitServerStatus {
    return this.jsonData!.status;
  }

  static getStatusIcon(connected: boolean): [string, string, boolean?] {
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
  ): Promise<KubeObjectListInterface<EDPGitServerKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }
}
