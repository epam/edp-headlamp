import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/QuickLink/types';

export interface QuickLinkListProps {
  items: QuickLinkKubeObjectInterface[];
  error: unknown;
  filterFunction: (item: QuickLinkKubeObjectInterface) => boolean;
}
