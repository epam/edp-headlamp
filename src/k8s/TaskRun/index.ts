import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { STATUS_COLOR } from '../../constants/colors';
import { ICONS } from '../../icons/iconify-icons-mapping';
import { ValueOf } from '../../types/global';
import { streamResults } from '../common/streamResults';
import { TaskRunKubeObjectConfig } from './config';
import {
    TASK_RUN_REASON,
    TASK_RUN_STATUS,
    TASK_RUN_STEP_REASON,
    TASK_RUN_STEP_STATUS,
} from './constants';
import {
    TASK_RUN_LABEL_SELECTOR_CD_PIPELINE_NAME,
    TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN,
    TASK_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from './labels';
import {
    StreamTaskRunListByPipelineNameAndPipelineTypeProps,
    TaskRunKubeObjectInterface,
} from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = TaskRunKubeObjectConfig;

export class TaskRunKubeObject extends K8s.cluster.makeKubeObject<TaskRunKubeObjectInterface>(
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

    static parseStatus(taskRun: TaskRunKubeObjectInterface): ValueOf<typeof TASK_RUN_STATUS> {
        return taskRun?.status?.conditions?.[0]?.status || 'Unknown';
    }

    static parseStatusReason(taskRun: TaskRunKubeObjectInterface): ValueOf<typeof TASK_RUN_REASON> {
        return taskRun?.status?.conditions?.[0]?.reason || 'Unknown';
    }

    static getStatusIcon(
        status: ValueOf<typeof TASK_RUN_STATUS>,
        reason: ValueOf<typeof TASK_RUN_REASON>
    ): [string, string, boolean?] {
        if (status === undefined || reason === undefined) {
            return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }
        const _status = status.toLowerCase();
        const _reason = reason.toLowerCase();

        switch (_status) {
            case TASK_RUN_STATUS.UNKNOWN:
                if (_reason === TASK_RUN_REASON.STARTED) {
                    return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];
                }

                if (_reason === TASK_RUN_REASON.RUNNING || _reason === TASK_RUN_REASON.PENDING) {
                    return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];
                }

                if (_reason === TASK_RUN_REASON.TASK_RUN_CANCELLED) {
                    return [ICONS.CROSS_CIRCLE, STATUS_COLOR.SUSPENDED];
                }

                return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
            case TASK_RUN_STATUS.TRUE:
                return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];
            case TASK_RUN_STATUS.FALSE:
                return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];
            default:
                return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }
    }

    static getStepStatusIcon(
        status: ValueOf<typeof TASK_RUN_STEP_STATUS>,
        reason: ValueOf<typeof TASK_RUN_STEP_REASON>
    ): [string, string, boolean?] {
        if (status === undefined || reason === undefined) {
            return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }
        const _status = status.toLowerCase();
        const _reason = reason.toLowerCase();

        switch (_status) {
            case TASK_RUN_STEP_STATUS.RUNNING:
                return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];
            case TASK_RUN_STEP_STATUS.WAITING:
                return [ICONS.LOADER_CIRCLE, STATUS_COLOR.IN_PROGRESS, true];
            case TASK_RUN_STEP_STATUS.TERMINATED:
                if (_reason === TASK_RUN_STEP_REASON.COMPLETED) {
                    return [ICONS.CHECK_CIRCLE, STATUS_COLOR.SUCCESS];
                }

                return [ICONS.CROSS_CIRCLE, STATUS_COLOR.ERROR];
            default:
                return [ICONS.UNKNOWN, STATUS_COLOR.UNKNOWN];
        }
    }

    static streamListByPipelineNameAndPipelineType({
        namespace,
        CDPipelineName,
        pipelineType,
        parentPipelineRunName,
        dataHandler,
        errorHandler,
    }: StreamTaskRunListByPipelineNameAndPipelineTypeProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${TASK_RUN_LABEL_SELECTOR_CD_PIPELINE_NAME}=${CDPipelineName},${TASK_RUN_LABEL_SELECTOR_PIPELINE_TYPE}=${pipelineType},${TASK_RUN_LABEL_SELECTOR_PARENT_PIPELINE_RUN}=${parentPipelineRunName}`,
        });
    }
}
