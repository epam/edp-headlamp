import { pluginLib } from '../../plugin.globals';
import { createRouteURL } from '../../utils/routes/createRouteURL';
import { EDPCDPipelineKubeObjectConfig } from './config';
import { EDPCDPipelineKubeObjectInterface, EDPCDPipelineSpec, EDPCDPipelineStatus } from './types';

const {
    ApiProxy,
    Cluster: { makeKubeObject },
} = pluginLib;
const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCDPipelineKubeObjectConfig;

export class EDPCDPipelineKubeObject extends makeKubeObject<EDPCDPipelineKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    getDetailsLink(type: string): string {
        return createRouteURL(type, {
            namespace: this.jsonData!.metadata.namespace,
            name: this.jsonData!.metadata.name,
        });
    }

    get spec(): EDPCDPipelineSpec {
        return this.jsonData!.spec;
    }

    get status(): EDPCDPipelineStatus {
        return this.jsonData!.status;
    }
}
