import { pluginLib } from '../../plugin.globals';
import { streamResult } from '../common/streamResult';
import { EDPCodebaseKubeObjectConfig } from './config';
import {
    EDPCodebaseKubeObjectInterface,
    EDPCodebaseSpecInterface,
    EDPCodebaseStatusInterface,
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
} = EDPCodebaseKubeObjectConfig;

export class EDPCodebaseKubeObject extends makeKubeObject<EDPCodebaseKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCodebaseSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseStatusInterface {
        return this.jsonData!.status;
    }
}

export const streamCodebase = (
    name: string,
    namespace: string,
    cb: (data: EDPCodebaseKubeObjectInterface | EDPCodebaseKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
): (() => void) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(url, name, cb, errCb);
};

export const getCodebasesByTypeLabel = (
    namespace: string,
    codebaseType: string
): Promise<{ items: EDPCodebaseKubeObjectInterface[] }> => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=app.edp.epam.com/codebaseType=${codebaseType}`;

    return ApiProxy.request(url);
};
