import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { JenkinsKubeObjectConfig } from './config';
import { JenkinsKubeObjectInterface, JenkinsSpec, JenkinsStatus } from './types';

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
} = JenkinsKubeObjectConfig;

export class JenkinsKubeObject extends makeKubeObject<JenkinsKubeObjectInterface>(singularForm) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): JenkinsSpec {
        return this.jsonData!.spec;
    }

    get status(): JenkinsStatus {
        return this.jsonData!.status;
    }

    static getList(
        namespace: string
    ): Promise<KubeObjectListInterface<JenkinsKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}
