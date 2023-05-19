import { pluginLib } from '../../plugin.globals';
import { streamResults } from '../common/streamResults';
import { PipelineRunKubeObjectConfig } from './config';
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
} from './types';

const {
    ApiProxy,
    K8s: {
        cluster: { makeKubeObject },
    },
} = pluginLib;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = PipelineRunKubeObjectConfig;

export class PipelineRunKubeObject extends makeKubeObject<PipelineRunKubeObjectInterface>(
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
}
