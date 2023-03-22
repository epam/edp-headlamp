import { pluginLib } from '../../plugin.globals';
import { EDPCDPipelineKubeObjectConfig } from './config';
import { EDPCDPipelineKubeObjectInterface, EDPCDPipelineSpec, EDPCDPipelineStatus } from './types';

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
} = EDPCDPipelineKubeObjectConfig;

export class EDPCDPipelineKubeObject extends makeKubeObject<EDPCDPipelineKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCDPipelineSpec {
        return this.jsonData!.spec;
    }

    get status(): EDPCDPipelineStatus {
        return this.jsonData!.status;
    }
}
