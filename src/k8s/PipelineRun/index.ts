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
export class PipelineRun extends makeKubeObject<PipelineRunKubeObjectInterface>(singularForm) {
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

export const getPipelineRunList = (
    namespace: string
): Promise<{ items: PipelineRunKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
};

export const streamPipelineRunListByCodebaseBranchLabel = (
    codebaseBranchLabel: string,
    cb: (data: PipelineRunKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const normalizedCodebaseBranchLabel = codebaseBranchLabel.replaceAll('/', '-');

    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/codebasebranch=${normalizedCodebaseBranchLabel}`,
    });
};

export const streamPipelineRunListByTypeLabel = (
    pipelineType: string,
    pipelineName: string,
    cb: (data: PipelineRunKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
): (() => void) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/pipelinetype=${pipelineType},app.edp.epam.com/pipelinename=${pipelineName}`,
    });
};
