import { makeKubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { EDPComponentKubeObjectConfig } from './config';
import { EDPComponentKubeObjectInterface } from './types';

const {
    pluginLib: { ApiProxy },
} = globalThis;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPComponentKubeObjectConfig;

export class EDPComponentKubeObject extends makeKubeObject<EDPComponentKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPComponentKubeObjectInterface['spec'] {
        return this.jsonData!.spec;
    }

    get status(): EDPComponentKubeObjectInterface['status'] {
        return this.jsonData!.status;
    }
}
