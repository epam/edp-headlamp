import { pluginLib } from '../../plugin.globals';
import { ArgoApplicationKubeObjectConfig } from './config';
import {
    ArgoApplicationKubeObjectInterface,
    ArgoApplicationSpec,
    ArgoApplicationStatus,
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
} = ArgoApplicationKubeObjectConfig;

// @ts-ignore
export class ArgoApplicationKubeObject extends makeKubeObject<ArgoApplicationKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): ArgoApplicationSpec {
        return this.jsonData!.spec;
    }

    get status(): ArgoApplicationStatus {
        return this.jsonData!.status;
    }
}
