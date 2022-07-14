import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { EDPCodebaseKubeObjectConfig } from './config';
import {
    EDPCodebaseKubeObjectInterface,
    EDPCodebaseSpecInterface,
    EDPCodebaseStatusInterface,
} from './types';

const {
    cluster: { makeKubeObject },
} = K8s;

const {
    pluginLib: { ApiProxy },
} = globalThis;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCodebaseKubeObjectConfig;

export class EDPCodebaseKubeObject extends makeKubeObject<EDPCodebaseKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static getCodebasesByTypeLabel(codebaseType: string) {
        const url = `/apis/${group}/${version}/${pluralForm}?labelSelector=${encodeURIComponent(
            `app.edp.epam.com/codebaseType=${codebaseType}`
        )}`;
        return ApiProxy.request(url) as Promise<EDPCodebaseKubeObjectInterface>;
    }

    getDetailsLink(type: string): string {
        return createRouteURL(type, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPCodebaseSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseStatusInterface {
        return this.jsonData!.status;
    }
}
