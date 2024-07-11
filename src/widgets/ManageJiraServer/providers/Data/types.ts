import { JiraServerKubeObjectInterface } from '../../../../k8s/JiraServer/types';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';

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
