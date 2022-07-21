import { pluginLib } from '../../plugin.globals';
import { EDPCDPipelineStageKubeObjectConfig } from './config';
import {
    EDPCDPipelineStageKubeObjectInterface,
    EDPCDPipelineStageSpecInterface,
    EDPCDPipelineStageStatusInterface,
} from './types';

const {
    ApiProxy,
    Cluster: { makeKubeObject },
} = pluginLib;
const {
    name: { singularForm, pluralForm },
    group,
    version,
} = EDPCDPipelineStageKubeObjectConfig;

export class EDPCDPipelineStageKubeObject extends makeKubeObject<EDPCDPipelineStageKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static getCDPipelineStagesByCDPipelineName(CDPipelineName: string) {
        const url = `/apis/${group}/${version}/${pluralForm}?labelSelector=${encodeURIComponent(
            `app.edp.epam.com/cdPipelineName=${CDPipelineName}`
        )}`;
        return ApiProxy.request(url) as Promise<EDPCDPipelineStageKubeObjectInterface>;
    }

    static get className(): string {
        return singularForm;
    }

    get listRoute(): string {
        return pluralForm;
    }

    get spec(): EDPCDPipelineStageSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCDPipelineStageStatusInterface {
        return this.jsonData!.status;
    }
}
