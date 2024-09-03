import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { streamResults } from '../../../common/streamResults';
import { ApprovalTaskKubeObjectConfig } from './config';
import { APPROVAL_TASK_STATUS } from './constants';
import { APPROVAL_TASK_LABEL_SELECTOR_PIPELINE_RUN } from './labels';
import {
  ApprovalTaskKubeObjectInterface,
  StreamApprovalTaskListByPipelineNameProps,
} from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = ApprovalTaskKubeObjectConfig;

export class ApprovalTaskKubeObject extends K8s.cluster.makeKubeObject<ApprovalTaskKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): ApprovalTaskKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): ApprovalTaskKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }

  static streamListByPipelineRunName = ({
    namespace,
    pipelineRunName,
    dataHandler,
    errorHandler,
  }: StreamApprovalTaskListByPipelineNameProps) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler, {
      labelSelector: `${APPROVAL_TASK_LABEL_SELECTOR_PIPELINE_RUN}=${pipelineRunName}`,
    });
  };

  static getStatusIcon(status: string): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
    switch (status) {
      case APPROVAL_TASK_STATUS.PENDING:
        return [ICONS.CLOCK, STATUS_COLOR.IN_PROGRESS];

      case APPROVAL_TASK_STATUS.APPROVED:
        return [ICONS.CHECK_CIRCLE_FILLED, STATUS_COLOR.SUCCESS];
      case APPROVAL_TASK_STATUS.REJECTED:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];
      case APPROVAL_TASK_STATUS.CANCELED:
        return [ICONS.TIMEOUT, STATUS_COLOR.ERROR];
      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }
}
