import { makeKubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { EDPCodebaseKubeObjectConfig } from './config';
import { EDPCodebaseKubeObjectInterface } from './types';

const {
    pluginLib: { ApiProxy },
} = window;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCodebaseKubeObjectConfig;

export class EDPCodebaseKubeObject extends makeKubeObject<EDPCodebaseKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPCodebaseKubeObjectInterface['spec'] {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseKubeObjectInterface['status'] {
        return this.jsonData!.status;
    }

    getDetailsLink(): string {
        return createRouteURL(singularForm, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }
}
