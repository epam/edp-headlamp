import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../constants/colors';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../types/k8s';
import { JiraServerKubeObjectConfig } from './config';
import { JIRA_SERVER_STATUS } from './constants';
import { JiraServerKubeObjectInterface, JiraServerSpec, JiraServerStatus } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = JiraServerKubeObjectConfig;

export class JiraServerKubeObject extends K8s.cluster.makeKubeObject<JiraServerKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): JiraServerSpec {
    return this.jsonData!.spec;
  }

  get status(): JiraServerStatus {
    return this.jsonData!.status;
  }

  static getList(
    namespace: string
  ): Promise<KubeObjectListInterface<JiraServerKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
  }

  static getStatusIcon(status: string): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    const _status = status.toLowerCase();

    switch (_status) {
      case JIRA_SERVER_STATUS.FINISHED:
        return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

      case JIRA_SERVER_STATUS.ERROR:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }
}
