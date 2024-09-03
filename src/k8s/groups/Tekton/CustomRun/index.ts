import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { streamResults } from '../../../common/streamResults';
import { CustomRunKubeObjectConfig } from './config';
import { CUSTOM_RUN_LABEL_SELECTOR_PIPELINE_RUN } from './labels';
import { CustomRunKubeObjectInterface, StreamCustomRunListByPipelineNameProps } from './types';

const {
  name: { singularForm, pluralForm },
  group,
  version,
} = CustomRunKubeObjectConfig;

export class CustomRunKubeObject extends K8s.cluster.makeKubeObject<CustomRunKubeObjectInterface>(
  singularForm
) {
  static apiEndpoint = ApiProxy.apiFactoryWithNamespace(group, version, pluralForm);

  static get className(): string {
    return singularForm;
  }

  get spec(): CustomRunKubeObjectInterface['spec'] {
    return this.jsonData!.spec;
  }

  get status(): CustomRunKubeObjectInterface['status'] {
    return this.jsonData!.status;
  }

  static streamListByPipelineRunName = ({
    namespace,
    pipelineRunName,
    dataHandler,
    errorHandler,
  }: StreamCustomRunListByPipelineNameProps) => {
    const url = `/apis/${group}/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler, {
      labelSelector: `${CUSTOM_RUN_LABEL_SELECTOR_PIPELINE_RUN}=${pipelineRunName}`,
    });
  };
}
