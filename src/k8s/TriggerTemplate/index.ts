import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { getNamespace } from '../../utils/getNamespace';
import { TriggerTemplateKubeObjectConfig } from './config';
import { TriggerTemplateKubeObjectInterface } from './types';

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
} = TriggerTemplateKubeObjectConfig;

export class TriggerTemplateKubeObject extends makeKubeObject<TriggerTemplateKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): any {
        return this.jsonData!.spec;
    }

    get status(): any {
        return this.jsonData!.status;
    }

    static getList(): Promise<KubeObjectListInterface<TriggerTemplateKubeObjectInterface>> {
        const namespace = getNamespace();
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}
