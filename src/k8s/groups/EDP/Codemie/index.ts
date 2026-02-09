import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { CodemieKubeObjectConfig } from './config';
import { EDP_CODEMIE_STATUS } from './constants';
import { CodemieKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodemieKubeObjectConfig;

export class CodemieKubeObject extends K8s.cluster.makeKubeObject<CodemieKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodemieKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): CodemieKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }

  static getStatusIcon(status: string | undefined): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    const _status = status.toLowerCase();

    switch (_status) {
      case EDP_CODEMIE_STATUS.CREATED:
        return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

      case EDP_CODEMIE_STATUS.ERROR:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }
}
