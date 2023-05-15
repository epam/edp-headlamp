import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { JiraServerKubeObjectConfig } from './config';
import { JiraServerKubeObjectInterface, JiraServerSpec, JiraServerStatus } from './types';

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
} = JiraServerKubeObjectConfig;

export class JiraServerKubeObject extends makeKubeObject<JiraServerKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): JiraServerSpec {
        return this.jsonData!.spec;
    }

    get status(): JiraServerStatus {
        return this.jsonData!.status;
    }

    static getList(
        namespace: string
    ): Promise<KubeObjectListInterface<JiraServerKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}
