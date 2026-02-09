import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CodemieApplicationKubeObjectConfig } from './config';
import { EDP_CODEMIE_APPLICATION_STATUS } from './constants';
import { CodemieApplicationKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodemieApplicationKubeObjectConfig;

export class CodemieApplicationKubeObject extends K8s.cluster.makeKubeObject<CodemieApplicationKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodemieApplicationKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): CodemieApplicationKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }

  static getStatusIcon(status: string): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    const _status = status.toLowerCase();

    switch (_status) {
      case EDP_CODEMIE_APPLICATION_STATUS.CREATED:
        return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

      case EDP_CODEMIE_APPLICATION_STATUS.ERROR:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }
}
