import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { streamResults } from '../../../common/streamResults';
import { ConfigMapKubeObjectConfig } from './config';
import { StreamListProps } from './types';

const {
  name: { pluralForm },
  version,
} = ConfigMapKubeObjectConfig;

export class ConfigMapKubeObject extends K8s.configMap.default {
  static streamList({ namespace, dataHandler, errorHandler }: StreamListProps): () => void {
    const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler);
  }
}
