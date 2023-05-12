import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { getNamespace } from '../../utils/getNamespace';
import { streamResult } from '../common/streamResult';
import { EDPGitServerKubeObjectConfig } from './config';
import { EDPGitServerKubeObjectInterface, EDPGitServerSpec, EDPGitServerStatus } from './types';

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
} = EDPGitServerKubeObjectConfig;

export class EDPGitServerKubeObject extends makeKubeObject<EDPGitServerKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPGitServerSpec {
        return this.jsonData!.spec;
    }

    get status(): EDPGitServerStatus {
        return this.jsonData!.status;
    }

    static getList(): Promise<KubeObjectListInterface<EDPGitServerKubeObjectInterface>> {
        const namespace = getNamespace();
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

        return ApiProxy.request(url);
    }
}

export const streamGitServer = (
    name: string,
    namespace: string,
    cb: (data: EDPGitServerKubeObjectInterface | EDPGitServerKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, name, cb, errCb);
};
