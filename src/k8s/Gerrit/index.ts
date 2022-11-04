import { pluginLib } from '../../plugin.globals';
import { GerritKubeObjectConfig } from './config';
import { GerritKubeObjectInterface, GerritSpec, GerritStatus } from './types';

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
} = GerritKubeObjectConfig;

// @ts-ignore
export class Application extends makeKubeObject<GerritKubeObjectInterface>(singularForm) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): GerritSpec {
        return this.jsonData!.spec;
    }

    get status(): GerritStatus {
        return this.jsonData!.status;
    }
}

export const getGerritList = (
    namespace: string
): Promise<{ items: GerritKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
};
