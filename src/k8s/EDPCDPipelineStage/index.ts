import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../constants/colors';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { KubeObjectListInterface } from '../../types/k8s';
import { streamResult } from '../common/streamResult';
import { streamResults } from '../common/streamResults';
import { EDPCDPipelineStageKubeObjectConfig } from './config';
import { EDP_CDPIPELINE_STAGE_STATUS } from './constants';
import { STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME } from './labels';
import {
    EDPCDPipelineStageKubeObjectInterface,
    EDPCDPipelineStageSpecInterface,
    EDPCDPipelineStageStatusInterface,
    StreamCDPipelineStageProps,
    StreamCDPipelineStagesByCDPipelineNameProps,
} from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCDPipelineStageKubeObjectConfig;

export class EDPCDPipelineStageKubeObject extends K8s.cluster.makeKubeObject<EDPCDPipelineStageKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCDPipelineStageSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCDPipelineStageStatusInterface {
        return this.jsonData!.status;
    }

    static getStatusIcon(status: string): [string, string, boolean?] {
        if (status === undefined) {
            return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }

        const _status = status.toLowerCase();

        switch (_status) {
            case EDP_CDPIPELINE_STAGE_STATUS.CREATED:
                return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];

            case EDP_CDPIPELINE_STAGE_STATUS.FAILED:
                return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];

            case EDP_CDPIPELINE_STAGE_STATUS.INITIALIZED:
                return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

            case EDP_CDPIPELINE_STAGE_STATUS.IN_PROGRESS:
                return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];

            default:
                return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }
    }

    static getList(
        namespace: string
    ): Promise<KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return ApiProxy.request(url);
    }

    static getListByCDPipelineName(
        namespace: string,
        CDPipelineMetadataName: string
    ): Promise<KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return ApiProxy.request(url, {
            labelSelector: `${STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME}=${CDPipelineMetadataName}`,
        });
    }

    static streamCDPipelineStage({
        namespace,
        stageMetadataName,
        dataHandler,
        errorHandler,
    }: StreamCDPipelineStageProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResult(url, stageMetadataName, dataHandler, errorHandler);
    }

    static streamCDPipelineStagesByCDPipelineName({
        namespace,
        CDPipelineMetadataName,
        dataHandler,
        errorHandler,
    }: StreamCDPipelineStagesByCDPipelineNameProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME}=${CDPipelineMetadataName}`,
        });
    }
}
