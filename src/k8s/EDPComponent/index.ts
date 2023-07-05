import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { EDPComponentKubeObjectConfig } from './config';
import { EDPComponentKubeObjectInterface, EDPComponentSpec } from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPComponentKubeObjectConfig;

export class EDPComponentKubeObject extends K8s.cluster.makeKubeObject<EDPComponentKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPComponentSpec {
        return this.jsonData!.spec;
    }

    get status(): string {
        return this.jsonData!.status;
    }

    static getList(namespace): Promise<KubeObjectListInterface<EDPComponentKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}
