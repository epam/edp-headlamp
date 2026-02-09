import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { streamResults } from '../../../common/streamResults';
import { PodKubeObjectConfig } from './config';
import { StreamListProps } from './types';

const {
  name: { pluralForm },
  version,
} = PodKubeObjectConfig;

export class PodKubeObject extends K8s.pod.default {
  static streamList({ namespace, dataHandler, errorHandler }: StreamListProps): () => void {
    const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler);
  }
}
