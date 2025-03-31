import { ApplicationKubeObjectInterface } from '../../../../k8s/groups/ArgoCD/Application/types';

export interface ApplicationMultiDeletionProps {
  applications: ApplicationKubeObjectInterface[];
  selected: string[];
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
  deleteArgoApplication: ({
    argoApplication,
  }: {
    argoApplication: ApplicationKubeObjectInterface;
  }) => Promise<void>;
}
