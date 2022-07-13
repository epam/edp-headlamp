import { makeKubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { EDPCodebaseBranchKubeObjectConfig } from './config';
import {
    EDPCodebaseBranchKubeObjectInterface,
    EDPCodebaseBranchSpecInterface,
    EDPCodebaseBranchStatusInterface,
} from './types';

const {
    pluginLib: { ApiProxy },
} = globalThis;

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCodebaseBranchKubeObjectConfig;

export class EDPCodebaseBranchKubeObject extends makeKubeObject<EDPCodebaseBranchKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static getCodebaseBranchesByCodebaseLabel(
        codebaseName: string,
        cb: (data: EDPCodebaseBranchKubeObjectInterface) => void
    ) {
        const url = `/apis/${group}/${version}/${pluralForm}?labelSelector=${encodeURIComponent(
            `app.edp.epam.com/codebaseName=${codebaseName}`
        )}`;
        return (ApiProxy.request(url) as Promise<EDPCodebaseBranchKubeObjectInterface>).then(data =>
            cb(data)
        );
    }

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPCodebaseBranchSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCodebaseBranchStatusInterface {
        return this.jsonData!.status;
    }

    getDetailsLink(): string {
        return createRouteURL(singularForm, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }
}
