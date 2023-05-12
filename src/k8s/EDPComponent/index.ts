import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { getNamespace } from '../../utils/getNamespace';
import { EDPComponentKubeObjectConfig } from './config';
import { EDPComponentKubeObjectInterface, EDPComponentSpec } from './types';

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
} = EDPComponentKubeObjectConfig;

export class EDPComponentKubeObject extends makeKubeObject<EDPComponentKubeObjectInterface>(
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

    static getList(): Promise<KubeObjectListInterface<EDPComponentKubeObjectInterface>> {
        const namespace = getNamespace();
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}
