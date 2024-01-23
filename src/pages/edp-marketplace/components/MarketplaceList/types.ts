import { EDPTemplateKubeObjectInterface } from '../../../../k8s/EDPTemplate/types';

export interface MarketplaceListProps {
  filterFunction: (item: EDPTemplateKubeObjectInterface) => boolean;
}
