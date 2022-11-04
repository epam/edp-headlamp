import { pluginLib } from '../../plugin.globals';
import { ApplicationKubeObjectConfig } from './config';
import { ApplicationKubeObjectInterface, ApplicationSpec, ApplicationStatus } from './types';

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
} = ApplicationKubeObjectConfig;

// @ts-ignore
export class ApplicationKubeObject extends makeKubeObject<ApplicationKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): ApplicationSpec {
        return this.jsonData!.spec;
    }

    get status(): ApplicationStatus {
        return this.jsonData!.status;
    }
}
