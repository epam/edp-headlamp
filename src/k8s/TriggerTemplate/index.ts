import { pluginLib } from '../../plugin.globals';
import { TriggerTemplateKubeObjectConfig } from './config';
import { TriggerTemplateKubeObjectInterface } from './types';

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
} = TriggerTemplateKubeObjectConfig;

// @ts-ignore
export class TriggerTemplate extends makeKubeObject<TriggerTemplateKubeObjectInterface>(
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

export const getTriggerTemplates = (
    namespace: string
): Promise<{ items: TriggerTemplateKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
};
