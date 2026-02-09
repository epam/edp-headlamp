import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { streamResults } from '../../../common/streamResults';
import { ResourceQuotaKubeObjectConfig } from './config';
import { RESOURCE_QUOTA_LABEL_TENANT } from './labels';
import { StreamListProps } from './types';

const {
  name: { pluralForm },
  version,
} = ResourceQuotaKubeObjectConfig;

export class ResourceQuotaKubeObject extends K8s.ResourceClasses.ResourceQuota {
  static streamList({
    namespace,
    tenantNamespace,
    dataHandler,
    errorHandler,
  }: StreamListProps): () => void {
    const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
    return streamResults(url, dataHandler, errorHandler, {
      labelSelector: `${RESOURCE_QUOTA_LABEL_TENANT}=edp-workload-${tenantNamespace}`,
    });
  }
}
