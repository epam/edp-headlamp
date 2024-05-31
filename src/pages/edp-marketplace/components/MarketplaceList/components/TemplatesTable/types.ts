import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';
import { PermissionSet } from '../../../../../../types/permissions';

export interface TemplatesTableProps {
  data: EDPTemplateKubeObjectInterface[];
  handleTemplateClick(template: EDPTemplateKubeObjectInterface): void;
  filterFunction?: ((...args: EDPTemplateKubeObjectInterface[]) => boolean) | null;
  warning?: React.ReactNode;
  error?: ApiError;
  permissions: PermissionSet;
}
