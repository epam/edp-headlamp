import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';

export interface QuickLinkListProps {
  items: QuickLinkKubeObjectInterface[];
  error: ApiError;
  filterFunction: (item: QuickLinkKubeObjectInterface) => boolean;
}
