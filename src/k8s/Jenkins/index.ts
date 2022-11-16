import { pluginLib } from '../../plugin.globals';
import { JenkinsKubeObjectConfig } from './config';
import { JenkinsKubeObjectInterface, JenkinsSpec, JenkinsStatus } from './types';

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
} = JenkinsKubeObjectConfig;

// @ts-ignore
export class Jenkins extends makeKubeObject<JenkinsKubeObjectInterface>(singularForm) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): JenkinsSpec {
        return this.jsonData!.spec;
    }

    get status(): JenkinsStatus {
        return this.jsonData!.status;
    }
}

export const getJenkinsList = (
    namespace: string
): Promise<{ items: JenkinsKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
};
