import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { streamResults } from '../../../common/streamResults';
import { ConfigMapKubeObjectConfig } from './config';
import { ConfigMapKubeObjectInterface, StreamListProps } from './types';

const {
  name: { pluralForm },
  version,
} = ConfigMapKubeObjectConfig;

export class ConfigMapKubeObject extends K8s.configMap.default {
  static streamList({ namespace, dataHandler, errorHandler }: StreamListProps): () => void {
    const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler);
  }

  static getItemByName(namespace: string, name: string): Promise<ConfigMapKubeObjectInterface> {
    const url = `/api/${version}/namespaces/${namespace}/${pluralForm}/${name}`;

    return ApiProxy.request(url);
  }
}
