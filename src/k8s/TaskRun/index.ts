import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { streamResults } from '../common/streamResults';
import { TaskRunKubeObjectConfig } from './config';
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
