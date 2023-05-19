import { pluginLib } from '../../plugin.globals';
import { streamResults } from '../common/streamResults';
import { ApplicationKubeObjectConfig } from './config';
import { APPLICATION_LABEL_SELECTOR_PIPELINE, APPLICATION_LABEL_SELECTOR_STAGE } from './labels';
import {
    ApplicationKubeObjectInterface,
    ApplicationSpec,
    ApplicationStatus,
    StreamApplicationListByPipelineStageLabelProps,
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
} = ApplicationKubeObjectConfig;

export class ApplicationKubeObject extends makeKubeObject<ApplicationKubeObjectInterface>(
    singularForm
) {
    static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

    static get className(): string {
        return singularForm;
    }

    get spec(): ApplicationSpec {
        return this.jsonData!.spec;
    }

    get status(): ApplicationStatus {
        return this.jsonData!.status;
    }

    static streamApplicationListByPipelineStageLabel({
        namespace,
        stageSpecName,
        CDPipelineMetadataName,
        dataHandler,
        errorHandler,
    }: StreamApplicationListByPipelineStageLabelProps): () => void {
        const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${APPLICATION_LABEL_SELECTOR_PIPELINE}=${CDPipelineMetadataName},${APPLICATION_LABEL_SELECTOR_STAGE}=${stageSpecName}`,
        });
    }
}
