import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { GerritKubeObjectConfig } from './config';
import { GerritKubeObjectInterface, GerritSpec, GerritStatus } from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = GerritKubeObjectConfig;

export class Gerrit extends K8s.cluster.makeKubeObject<GerritKubeObjectInterface>(singularForm) {
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
