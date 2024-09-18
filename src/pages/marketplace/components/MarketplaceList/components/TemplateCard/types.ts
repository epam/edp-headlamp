import { TemplateKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Template/types';
import { PermissionsConfig } from '../../../../../../providers/Permissions/types';
import { permissionsToCheckConfig } from '../../../../constants';

export interface TemplateCardProps {
  template: TemplateKubeObjectInterface;
  handleTemplateClick(template: TemplateKubeObjectInterface): void;
  permissions: PermissionsConfig<typeof permissionsToCheckConfig>;
}
