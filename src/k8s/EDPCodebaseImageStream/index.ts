import { makeKubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { EDPCodebaseImageStreamKubeObjectConfig } from './config';
import {
    EDPCodebaseImageStreamKubeObjectInterface,
    EDPCodebaseImageStreamSpecInterface,
    EDPCodebaseImageStreamStatusInterface,
} from './types';

const {
    pluginLib: { ApiProxy },
} = globalThis;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCodebaseImageStreamKubeObjectConfig;

export class EDPCodebaseImageStreamKubeObject extends makeKubeObject<EDPCodebaseImageStreamKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPCodebaseImageStreamSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseImageStreamStatusInterface {
        return this.jsonData!.status;
    }

    getDetailsLink(): string {
        return createRouteURL(singularForm, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }
}
