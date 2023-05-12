import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { getNamespace } from '../../utils/getNamespace';
import { EDPCodebaseImageStreamKubeObjectConfig } from './config';
import {
    EDPCodebaseImageStreamKubeObjectInterface,
    EDPCodebaseImageStreamSpecInterface,
    EDPCodebaseImageStreamStatusInterface,
} from './types';

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
} = EDPCodebaseImageStreamKubeObjectConfig;

export class EDPCodebaseImageStreamKubeObject extends makeKubeObject<EDPCodebaseImageStreamKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCodebaseImageStreamSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseImageStreamStatusInterface {
        return this.jsonData!.status;
    }

    static getList(): Promise<KubeObjectListInterface<EDPCodebaseImageStreamKubeObjectInterface>> {
        const namespace = getNamespace();
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}
