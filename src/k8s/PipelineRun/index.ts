import { pluginLib } from '../../plugin.globals';
import { streamResults } from '../common/streamResults';
import { PipelineRunKubeObjectConfig } from './config';
import { PipelineRunKubeObjectInterface } from './types';

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

// @ts-ignore
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
}

export const streamPipelineRunListByCodebaseBranchLabel = (
    codebaseBranchLabel: string,
    cb: (data: PipelineRunKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const normalizedCodebaseBranchLabel = codebaseBranchLabel.replaceAll('/', '-');

    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/codebasebranch=${normalizedCodebaseBranchLabel}`,
    });
};

export const streamPipelineRunListByTypeAndPipelineNameLabels = (
    pipelineType: string,
    stageMetadataName: string,
    cb: (data: PipelineRunKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/pipelinetype=${pipelineType},app.edp.epam.com/pipeline=${stageMetadataName}`,
    });
};

export const streamAutotestRunnerPipelineRunList = (
    stageSpecName: string,
    CDPipelineMetadataName: string,
    cb: (data: PipelineRunKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/pipelinetype=autotestRunner,app.edp.epam.com/stage=${stageSpecName},app.edp.epam.com/pipeline=${CDPipelineMetadataName}`,
    });
};

export const streamAutotestsPipelineRunList = (
    stageSpecName: string,
    CDPipelineMetadataName: string,
    cb: (data: PipelineRunKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/stage=${stageSpecName},app.edp.epam.com/pipeline=${CDPipelineMetadataName}`,
    });
};
