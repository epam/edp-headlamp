import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../constants/colors';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { ValueOf } from '../../types/global';
import { streamResults } from '../common/streamResults';
import { PipelineRunKubeObjectConfig } from './config';
import { PIPELINE_RUN_REASON, PIPELINE_RUN_STATUS } from './constants';
import {
    PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH,
    PIPELINE_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN,
    PIPELINE_RUN_LABEL_SELECTOR_PIPELINE,
    PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
    PIPELINE_RUN_LABEL_SELECTOR_STAGE,
} from './labels';
import {
    PipelineRunKubeObjectInterface,
    StreamAutotestRunnerPipelineRunListProps,
    StreamAutotestsPipelineRunListProps,
    StreamPipelineRunListByCodebaseBranchLabelProps,
    StreamPipelineRunListByTypeAndPipelineNameLabelsProps,
    StreamPipelineRunListByTypeLabelProps,
} from './types';

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
                return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];
            case PIPELINE_RUN_STATUS.FALSE:
                return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];
            default:
                return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }
    }

    static streamPipelineRunListByCodebaseBranchLabel({
        namespace,
        codebaseBranchLabel,
        dataHandler,
        errorHandler,
    }: StreamPipelineRunListByCodebaseBranchLabelProps): () => void {
        const normalizedCodebaseBranchLabel = codebaseBranchLabel.replaceAll('/', '-');

        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH}=${normalizedCodebaseBranchLabel}`,
        });
    }

    static streamPipelineRunListByTypeAndPipelineNameLabels({
        namespace,
        pipelineType,
        stageMetadataName,
        dataHandler,
        errorHandler,
    }: StreamPipelineRunListByTypeAndPipelineNameLabelsProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE}=${pipelineType},${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE}=${stageMetadataName}`,
        });
    }

    static streamAutotestRunnerPipelineRunList({
        namespace,
        stageSpecName,
        CDPipelineMetadataName,
        dataHandler,
        errorHandler,
    }: StreamAutotestRunnerPipelineRunListProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE}=autotestRunner,${PIPELINE_RUN_LABEL_SELECTOR_STAGE}=${stageSpecName},${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE}=${CDPipelineMetadataName}`,
        });
    }

    static streamAutotestsPipelineRunList({
        namespace,
        stageSpecName,
        CDPipelineMetadataName,
        parentPipelineRunName,
        dataHandler,
        errorHandler,
    }: StreamAutotestsPipelineRunListProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${parentPipelineRunName},${PIPELINE_RUN_LABEL_SELECTOR_STAGE}=${stageSpecName},${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE}=${CDPipelineMetadataName}`,
        });
    }

    static streamPipelineRunListByTypeLabel({
        namespace,
        type,
        dataHandler,
        errorHandler,
    }: StreamPipelineRunListByTypeLabelProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        if (type) {
            return streamResults(url, dataHandler, errorHandler, {
                labelSelector: `${PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE}=${type}`,
            });
        }

        return streamResults(url, dataHandler, errorHandler);
    }
}
