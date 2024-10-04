import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import { TemplateKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Template/types';
import { PermissionsConfig } from '../../../../../../providers/Permissions/types';
import { permissionsToCheckConfig } from '../../../../constants';

export interface TemplatesTableProps {
  data: TemplateKubeObjectInterface[];
  handleTemplateClick(template: TemplateKubeObjectInterface): void;
  filterFunction?: ((...args: TemplateKubeObjectInterface[]) => boolean) | null;
  warning?: React.ReactNode;
  errors?: ApiError[] | null;
  permissions: PermissionsConfig<typeof permissionsToCheckConfig>;
}
