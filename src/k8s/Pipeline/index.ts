import { pluginLib } from '../../plugin.globals';
import { PipelineKubeObjectConfig } from './config';
import { PipelineKubeObjectInterface } from './types';

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
} = PipelineKubeObjectConfig;

// @ts-ignore
export class Pipeline extends makeKubeObject<PipelineKubeObjectInterface>(singularForm) {
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

export const getPipelinesByType = (
    namespace: string,
    pipelineType: string
): Promise<{ items: PipelineKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=app.edp.epam.com/pipelinetype=${pipelineType}`;

    return ApiProxy.request(url);
};
