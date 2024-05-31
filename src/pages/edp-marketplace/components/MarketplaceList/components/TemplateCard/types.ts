import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';
import { PermissionSet } from '../../../../../../types/permissions';

export interface TemplateCardProps {
  template: EDPTemplateKubeObjectInterface;
  handleTemplateClick(template: EDPTemplateKubeObjectInterface): void;
  permissions: PermissionSet;
}
