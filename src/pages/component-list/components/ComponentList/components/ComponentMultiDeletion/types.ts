import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';

export interface ComponentMultiDeletionProps {
  components: CodebaseKubeObjectInterface[];
  selected: string[];
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
}
