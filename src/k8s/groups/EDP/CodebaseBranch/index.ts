import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { streamResults } from '../../../common/streamResults';
import { CodebaseBranchKubeObjectConfig } from './config';
import { EDP_CODEBASE_BRANCH_STATUS } from './constants';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from './labels';
import { CodebaseBranchKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CodebaseBranchKubeObjectConfig;

export class CodebaseBranchKubeObject extends K8s.cluster.makeKubeObject<CodebaseBranchKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  static get pluralName(): string {
    return pluralForm;
  }

  get spec(): CodebaseBranchKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): CodebaseBranchKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }

  static getStatusIcon(status: string): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    const _status = status.toLowerCase();

    switch (_status) {
      case EDP_CODEBASE_BRANCH_STATUS.CREATED:
        return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

      case EDP_CODEBASE_BRANCH_STATUS.FAILED:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

      case EDP_CODEBASE_BRANCH_STATUS.INITIALIZED:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      case EDP_CODEBASE_BRANCH_STATUS.IN_PROGRESS:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }

  static getListByCodebaseName(
    namespace: string,
    codebaseName: string
  ): Promise<KubeObjectListInterface<CodebaseBranchKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME}=${codebaseName}`;
    return ApiProxy.request(url);
  }

  static streamListByCodebaseLabel = (
    codebaseName: string,
    cb: (data: CodebaseBranchKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace: string
  ): (() => any) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
      labelSelector: `${CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME}=${codebaseName}`,
    });
  };
}
