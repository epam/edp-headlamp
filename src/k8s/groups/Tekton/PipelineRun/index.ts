import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { ValueOf } from '../../../../types/global';
import { PipelineRunKubeObjectConfig } from './config';
import { PIPELINE_RUN_REASON, PIPELINE_RUN_STATUS } from './constants';
import { PipelineRunKubeObjectInterface } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = PipelineRunKubeObjectConfig;

export class PipelineRunKubeObject extends K8s.cluster.makeKubeObject<PipelineRunKubeObjectInterface>(
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

  static parseStatus(
    pipelineRun: PipelineRunKubeObjectInterface
  ): ValueOf<typeof PIPELINE_RUN_STATUS> {
    return pipelineRun?.status?.conditions?.[0]?.status || 'Unknown';
  }

  static parseStatusReason(
    pipelineRun: PipelineRunKubeObjectInterface
  ): ValueOf<typeof PIPELINE_RUN_REASON> {
    return pipelineRun?.status?.conditions?.[0]?.reason || 'Unknown';
  }

  static parseStatusMessage(
    pipelineRun: PipelineRunKubeObjectInterface
  ): ValueOf<typeof PIPELINE_RUN_STATUS> {
    return pipelineRun?.status?.conditions?.[0]?.message || 'No message';
  }

  static getStatusIcon(status: string, reason: string): [string, string, boolean?] {
    if (status === undefined || reason === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
    const _status = status.toLowerCase();
    const _reason = reason.toLowerCase();

    switch (_status) {
      case PIPELINE_RUN_STATUS.UNKNOWN:
        if (_reason === PIPELINE_RUN_REASON.STARTED) {
          return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];
        }

        if (_reason === PIPELINE_RUN_REASON.RUNNING) {
          return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];
        }

        if (_reason === PIPELINE_RUN_REASON.CANCELLED) {
          return [ICONS.CROSS_CIRCLE, STATUS_COLOR.SUSPENDED];
        }

        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
      case PIPELINE_RUN_STATUS.TRUE:
        return [ICONS.CHECK_CIRCLE_FILLED, STATUS_COLOR.SUCCESS];
      case PIPELINE_RUN_STATUS.FALSE:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];
      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }
}
