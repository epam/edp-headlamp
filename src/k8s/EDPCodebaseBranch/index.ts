import { pluginLib } from '../../plugin.globals';
import { streamResults } from '../common';
import { EDPCodebaseBranchKubeObjectConfig } from './config';
import {
    EDPCodebaseBranchKubeObjectInterface,
    EDPCodebaseBranchSpecInterface,
    EDPCodebaseBranchStatusInterface,
} from './types';

const {
    ApiProxy,
    Cluster: { makeKubeObject },
} = pluginLib;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCodebaseBranchKubeObjectConfig;

export class EDPCodebaseBranchKubeObject extends makeKubeObject<EDPCodebaseBranchKubeObjectInterface>(
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
}

export const streamCodebaseBranchesByCodebaseLabel = (
    codebaseName: string,
    cb: (data: EDPCodebaseBranchKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace: string
): (() => any) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(
        url,
        data => cb(data),
        error => errCb(error),
        {
            labelSelector: `app.edp.epam.com/codebaseName=${codebaseName}`,
        }
    );
};
