import { pluginLib } from '../../plugin.globals';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { streamResult, streamResults } from '../common';
import { EDPCodebaseKubeObjectConfig } from './config';
import {
    EDPCodebaseKubeObjectInterface,
    EDPCodebaseSpecInterface,
    EDPCodebaseStatusInterface,
} from './types';

const {
    ApiProxy,
    Cluster: { makeKubeObject },
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

    getDetailsLink(type: string): string {
        return createRouteURL(type, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }

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
    cb: (data: EDPCodebaseKubeObjectInterface[]) => void,
    errCb: (err: Error) => void
): any => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResult(
        url,
        name,
        data => cb(data),
        error => errCb(error)
    );
};

export const streamCodebasesByTypeLabel = (
    codebaseType: string,
    cb: (data: EDPCodebaseKubeObjectInterface[]) => void,
    errCb: (err: Error) => void,
    namespace?: string
) => {
    const url = namespace
        ? `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`
        : `/apis/${group}/${version}/${pluralForm}`;
    return streamResults(
        url,
        data => cb(data),
        error => errCb(error),
        {
            labelSelector: `app.edp.epam.com/codebaseType=${codebaseType}`,
        }
    );
};
