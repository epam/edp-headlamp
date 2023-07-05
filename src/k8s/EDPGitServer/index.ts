import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { streamResult } from '../common/streamResult';
import { EDPGitServerKubeObjectConfig } from './config';
import { EDPGitServerKubeObjectInterface, EDPGitServerSpec, EDPGitServerStatus } from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPGitServerKubeObjectConfig;

export class EDPGitServerKubeObject extends K8s.cluster.makeKubeObject<EDPGitServerKubeObjectInterface>(
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

    static getList(
        namespace: string
    ): Promise<KubeObjectListInterface<EDPGitServerKubeObjectInterface>> {
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
