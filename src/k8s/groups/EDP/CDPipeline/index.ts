import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../../../constants/colors';
import { ICONS } from '../../../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { streamResult } from '../../../common/streamResult';
import { CDPipelineKubeObjectConfig } from './config';
import { EDP_CDPIPELINE_STATUS } from './constants';
import {
  CDPipelineKubeObjectInterface,
  CDPipelineSpec,
  CDPipelineStatus,
  StreamCDPipelineProps,
} from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CDPipelineKubeObjectConfig;

export class CDPipelineKubeObject extends K8s.cluster.makeKubeObject<CDPipelineKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CDPipelineSpec {
    return this.jsonData!.spec;
  }

  get status(): CDPipelineStatus {
    return this.jsonData!.status;
  }

  static getStatusIcon(status: string): [string, string, boolean?] {
    if (status === undefined) {
      return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }

    const _status = status.toLowerCase();

    switch (_status) {
      case EDP_CDPIPELINE_STATUS.CREATED:
        return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

      case EDP_CDPIPELINE_STATUS.FAILED:
        return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

      case EDP_CDPIPELINE_STATUS.INITIALIZED:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      case EDP_CDPIPELINE_STATUS.IN_PROGRESS:
        return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

      default:
        return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
    }
  }

  static getList(
    namespace: string
  ): Promise<KubeObjectListInterface<CDPipelineKubeObjectInterface>> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return ApiProxy.request(url);
  }

  static getItemByName(namespace: string, name: string): Promise<CDPipelineKubeObjectInterface> {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}/${name}`;
    return ApiProxy.request(url);
  }

  static streamCDPipeline({
    namespace,
    CDPipelineMetadataName,
    dataHandler,
    errorHandler,
  }: StreamCDPipelineProps): () => void {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, CDPipelineMetadataName, dataHandler, errorHandler);
  }
}
