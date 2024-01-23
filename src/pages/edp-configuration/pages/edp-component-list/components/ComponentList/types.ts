import { EDPComponentKubeObjectInterface } from '../../../../../../k8s/EDPComponent/types';

export interface EDPComponentListProps {
  items: EDPComponentKubeObjectInterface[];
  error: unknown;
  filterFunction: (item: EDPComponentKubeObjectInterface) => boolean;
}
