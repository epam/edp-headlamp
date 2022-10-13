import { pluginLib } from '../../plugin.globals';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { streamResult } from '../common/streamResult';
import { streamResults } from '../common/streamResults';
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

    getDetailsLink(type: string): string {
        return createRouteURL(type, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPGitServerSpec {
        return this.jsonData!.spec;
    }

    get status(): EDPGitServerStatus {
        return this.jsonData!.status;
    }
}

export const streamGitServers = (
    cb: (data: EDPGitServerKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb);
};

export const streamGitServer = (
    name: string,
    namespace: string,
    cb: (data: EDPGitServerKubeObjectInterface | EDPGitServerKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, name, cb, errCb);
};
