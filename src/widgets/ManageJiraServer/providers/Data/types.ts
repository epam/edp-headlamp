import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { JiraServerKubeObjectInterface } from '../../../../k8s/groups/EDP/JiraServer/types';

export interface DataContextProviderValue {
  secret: SecretKubeObjectInterface;
  jiraServer: JiraServerKubeObjectInterface;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}

export interface DataContextProviderProps {
  secret: SecretKubeObjectInterface;
  jiraServer: JiraServerKubeObjectInterface;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}
