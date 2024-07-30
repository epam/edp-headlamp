import { TemplateKubeObjectInterface } from '../../../../k8s/groups/EDP/Template/types';

export interface MarketplaceListProps {
  filterFunction: (item: TemplateKubeObjectInterface) => boolean;
  warning: React.ReactNode;
}
