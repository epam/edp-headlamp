import { pluginLib } from '../../plugin.globals';
import { streamResults } from '../common/streamResults';
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

// @ts-ignore
export class EDPComponentKubeObject extends makeKubeObject<EDPComponentKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPComponentSpec {
        return this.jsonData!.spec;
    }

    get status(): string {
        return this.jsonData!.status;
    }
}

export const getEDPComponents = (
    namespace: string
): Promise<{ items: EDPComponentKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;

    return ApiProxy.request(url);
};

export const streamEDPComponents = (
    cb: (data: EDPComponentKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(url, cb, errCb);
};
