import { EDPCodebaseKubeObjectInterface } from '../../../../../../k8s/EDPCodebase/types';

export interface ComponentMultiDeletionProps {
  components: EDPCodebaseKubeObjectInterface[];
  selected: string[];
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
}
