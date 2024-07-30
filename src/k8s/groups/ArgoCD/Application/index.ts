import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { ValueOf } from '../../../../types/global';
import { streamResults } from '../../../common/streamResults';
import { ApplicationKubeObjectConfig } from './config';
import { APPLICATION_HEALTH_STATUS, APPLICATION_SYNC_STATUS } from './constants';
import { APPLICATION_LABEL_SELECTOR_PIPELINE, APPLICATION_LABEL_SELECTOR_STAGE } from './labels';
import {
  ApplicationKubeObjectInterface,
  ApplicationSpec,
  ApplicationStatus,
  StreamApplicationListByPipelineStageLabelProps,
} from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = ApplicationKubeObjectConfig;

export class ApplicationKubeObject extends K8s.cluster.makeKubeObject<ApplicationKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): ApplicationSpec {
    return this.jsonData!.spec;
  }

  get status(): ApplicationStatus {
    return this.jsonData!.status;
  }

  static parseStatus(
    argoApp: ApplicationKubeObjectInterface
  ): ValueOf<typeof APPLICATION_HEALTH_STATUS> {
    return (
      (argoApp?.status?.health?.status.toLowerCase() as ValueOf<
        typeof APPLICATION_HEALTH_STATUS
      >) || 'unknown'
    );
  }

  static getHealthStatusIcon(health: string): [string, string, boolean?] {
    if (health === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
    const _health = health.toLowerCase();

    switch (_health) {
      case APPLICATION_HEALTH_STATUS.HEALTHY:
        return [ICONS.HEART, STATUS_COLOR.SUCCESS];

      case APPLICATION_HEALTH_STATUS.PROGRESSING:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      case APPLICATION_HEALTH_STATUS.DEGRADED:
        return [ICONS.HEART_BROKEN, STATUS_COLOR.ERROR];

      case APPLICATION_HEALTH_STATUS.SUSPENDED:
        return [ICONS.PAUSE, STATUS_COLOR.SUSPENDED];

      case APPLICATION_HEALTH_STATUS.MISSING:
        return [ICONS.GHOST, STATUS_COLOR.MISSING];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }

  static getSyncStatusIcon(sync: string): [string, string, boolean?] {
    if (sync === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
    const _sync = sync.toLowerCase();

    switch (_sync) {
      case APPLICATION_SYNC_STATUS.SYNCED:
        return [ICONS.CHECK_CIRCLE_FILLED, STATUS_COLOR.SUCCESS];

      case APPLICATION_SYNC_STATUS.OUT_OF_SYNC:
        return [ICONS.ARROW_CIRCLE_UP_FILLED, STATUS_COLOR.MISSING];

      default:
        return [ICONS.CIRCLE_NOTCH, STATUS_COLOR.UNKNOWN];
    }
  }

  static streamApplicationListByPipelineStageLabel({
    namespace,
    stageSpecName,
    CDPipelineMetadataName,
    dataHandler,
    errorHandler,
  }: StreamApplicationListByPipelineStageLabelProps): () => void {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler, {
      labelSelector: `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${CDPipelineMetadataName},${APPLICATION_LABEL_SELECTOR_STAGE}=${stageSpecName}`,
    });
  }
}
