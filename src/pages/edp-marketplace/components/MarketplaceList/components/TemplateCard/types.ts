import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';

export interface TemplateCardProps {
  template: EDPTemplateKubeObjectInterface;
  handleTemplateClick(template: EDPTemplateKubeObjectInterface): void;
}
