import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { PIPELINE_TYPES } from '../../constants/pipelineTypes';
import { KubeObjectListInterface } from '../../types/k8s';
import { PipelineKubeObjectConfig } from './config';
import { PIPELINE_LABEL_SELECTOR_PIPELINE_TYPE } from './labels';
import { PipelineKubeObjectInterface } from './types';

const {
    name: { singularForm, pluralForm },
    group,
    version,
} = PipelineKubeObjectConfig;

export class PipelineKubeObject extends K8s.cluster.makeKubeObject<PipelineKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): any {
        return this.jsonData!.spec;
    }

    get status(): any {
        return this.jsonData!.status;
    }

    static getListByPipelineType(
        namespace: string,
        pipelineType: PIPELINE_TYPES
    ): Promise<KubeObjectListInterface<PipelineKubeObjectInterface>> {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${PIPELINE_LABEL_SELECTOR_PIPELINE_TYPE}=${pipelineType}`;
        return ApiProxy.request(url);
    }
}
