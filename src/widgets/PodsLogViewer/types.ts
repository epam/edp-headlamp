import { PodKubeObjectInterface } from "../../k8s/groups/default/Pod/types";

export interface PodsLogViewerProps {
  pods: PodKubeObjectInterface[];
  getDefaultContainer: (pod: PodKubeObjectInterface) => string;
}

export interface PodsLogViewerInnerProps {
  pods: PodKubeObjectInterface[];
  activePod: PodKubeObjectInterface;
  container: string;
  setContainer: React.Dispatch<React.SetStateAction<string>>;
  handlePodChange: (event: any) => void;
}
