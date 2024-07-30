import { TemplateKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Template/types';
import { PermissionSet } from '../../../../../../types/permissions';

export interface TemplateCardProps {
  template: TemplateKubeObjectInterface;
  handleTemplateClick(template: TemplateKubeObjectInterface): void;
  permissions: PermissionSet;
}
