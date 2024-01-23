import { JiraServerKubeObjectInterface } from '../../k8s/JiraServer/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageJiraIntegrationSecretFormDataContext {
  jiraServer: JiraServerKubeObjectInterface;
  jiraServerSecret: SecretKubeObjectInterface;
  ownerReference: string | undefined;
  isReadOnly: boolean;
  mode: ValueOf<typeof FORM_MODES>;
  handleClosePanel?: () => void;
}

export interface ManageJiraIntegrationSecretProps {
  formData: ManageJiraIntegrationSecretFormDataContext;
}

export type ManageJiraIntegrationSecretFormValues = FormValues<
  typeof JIRA_INTEGRATION_SECRET_FORM_NAMES
>;
