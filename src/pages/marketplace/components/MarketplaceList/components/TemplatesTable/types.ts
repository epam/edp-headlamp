import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TemplateKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Template/types';
import { PermissionSet } from '../../../../../../types/permissions';

export interface TemplatesTableProps {
  data: TemplateKubeObjectInterface[];
  handleTemplateClick(template: TemplateKubeObjectInterface): void;
  filterFunction?: ((...args: TemplateKubeObjectInterface[]) => boolean) | null;
  warning?: React.ReactNode;
  error?: ApiError;
  permissions: PermissionSet;
}
