import { pluginLib } from '../../plugin.globals';
import { KubeObjectListInterface } from '../../types/k8s';
import { streamResults } from '../common/streamResults';
import { EDPCDPipelineStageKubeObjectConfig } from './config';
import { STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME } from './labels';
import {
    EDPCDPipelineStageKubeObjectInterface,
    EDPCDPipelineStageSpecInterface,
    EDPCDPipelineStageStatusInterface,
    StreamCDPipelineStagesByCDPipelineNameProps,
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
} = EDPCDPipelineStageKubeObjectConfig;

export class EDPCDPipelineStageKubeObject extends makeKubeObject<EDPCDPipelineStageKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): EDPCDPipelineStageSpecInterface {
        return this.jsonData!.spec;
    }

    get status(): EDPCDPipelineStageStatusInterface {
        return this.jsonData!.status;
    }

    static getList(
        namespace: string
    ): Promise<KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return ApiProxy.request(url);
    }

    static streamCDPipelineStagesByCDPipelineName({
        namespace,
        CDPipelineMetadataName,
        dataHandler,
        errorHandler,
    }: StreamCDPipelineStagesByCDPipelineNameProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${STAGE_LABEL_SELECTOR_CD_PIPELINE_NAME}=${CDPipelineMetadataName}`,
        });
    }
}
