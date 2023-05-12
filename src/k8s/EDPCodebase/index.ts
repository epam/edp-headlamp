import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { getNamespace } from '../../utils/getNamespace';
import { streamResult } from '../common/streamResult';
import { EDPCodebaseKubeObjectConfig } from './config';
import { CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE } from './labels';
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

    static getListByTypeLabel(
        codebaseType: CODEBASE_TYPES
    ): Promise<KubeObjectListInterface<EDPCodebaseKubeObjectInterface>> {
        const namespace = getNamespace();
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${CODEBASE_LABEL_SELECTOR_CODEBASE_TYPE}=${codebaseType}`;
        return ApiProxy.request(url);
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
