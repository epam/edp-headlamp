import { EDPTemplateKubeObjectInterface } from '../../../../../../k8s/EDPTemplate/types';

export interface TemplatesTableProps {
  data: EDPTemplateKubeObjectInterface[];
  handleTemplateClick(template: EDPTemplateKubeObjectInterface): void;
  filterFunction?: ((...args: EDPTemplateKubeObjectInterface[]) => boolean) | null;
  warning?: React.ReactNode;
}
