import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { EDPTemplateKubeObjectConfig } from './config';
import { EDPTemplateKubeObjectInterface, EDPTemplateSpec } from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPTemplateKubeObjectConfig;

export class EDPTemplateKubeObject extends K8s.cluster.makeKubeObject<EDPTemplateKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPTemplateSpec {
        return this.jsonData!.spec;
    }

    static getList(
        namespace: string
    ): Promise<KubeObjectListInterface<EDPTemplateKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return ApiProxy.request(url);
    }
}
