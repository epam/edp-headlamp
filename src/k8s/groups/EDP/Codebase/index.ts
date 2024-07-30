import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { CODEBASE_TYPES } from '../../../../constants/codebaseTypes';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { streamResult } from '../../../common/streamResult';
import { CodebaseKubeObjectConfig } from './config';
import { EDP_CODEBASE_STATUS } from './constants';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from './labels';
import {
  CodebaseKubeObjectInterface,
  CodebaseSpecInterface,
  CodebaseStatusInterface,
} from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodebaseKubeObjectConfig;

export class CodebaseKubeObject extends K8s.cluster.makeKubeObject<CodebaseKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CodebaseSpecInterface {
    return this.jsonData!.spec;
  }

  get status(): CodebaseStatusInterface {
    return this.jsonData!.status;
  }

  static getStatusIcon(status: string): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    const _status = status.toLowerCase();

    switch (_status) {
      case EDP_CODEBASE_STATUS.CREATED:
        return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

      case EDP_CODEBASE_STATUS.FAILED:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

      case EDP_CODEBASE_STATUS.INITIALIZED:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      case EDP_CODEBASE_STATUS.IN_PROGRESS:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }

  static getListByTypeLabel(
    namespace: string,
    codebaseType: CODEBASE_TYPES
  ): Promise<KubeObjectListInterface<CodebaseKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${codebaseType}`;
    return ApiProxy.request(url);
  }

  static streamItem(
    name: string,
    namespace: string,
    cb: (data: CodebaseKubeObjectInterface | CodebaseKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
  ): () => void {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, name, cb, errCb);
  }
}
