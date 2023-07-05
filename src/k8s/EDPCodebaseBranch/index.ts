import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { streamResults } from '../common/streamResults';
import { EDPCodebaseBranchKubeObjectConfig } from './config';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from './labels';
import {
    EDPCodebaseBranchKubeObjectInterface,
    EDPCodebaseBranchSpecInterface,
    EDPCodebaseBranchStatusInterface,
} from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCodebaseBranchKubeObjectConfig;

export class EDPCodebaseBranchKubeObject extends K8s.cluster.makeKubeObject<EDPCodebaseBranchKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCodebaseBranchSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseBranchStatusInterface {
        return this.jsonData!.status;
    }

    static getListByCodebaseName(
        namespace: string,
        codebaseName: string
    ): Promise<KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME}=${codebaseName}`;
        return ApiProxy.request(url);
    }
}

export const streamCodebaseBranchesByCodebaseLabel = (
    codebaseName: string,
    cb: (data: EDPCodebaseBranchKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace: string
): (() => any) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, cb, errCb, {
        labelSelector: `app.edp.epam.com/codebaseName=${codebaseName}`,
    });
};
