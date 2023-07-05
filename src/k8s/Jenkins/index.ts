import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { JenkinsKubeObjectConfig } from './config';
import { JenkinsKubeObjectInterface, JenkinsSpec, JenkinsStatus } from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = JenkinsKubeObjectConfig;

export class JenkinsKubeObject extends K8s.cluster.makeKubeObject<JenkinsKubeObjectInterface>(
    singularForm
) {
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
