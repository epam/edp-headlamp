import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { JiraServerKubeObjectInterface } from '../../k8s/groups/EDP/JiraServer/types';
import { FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES } from './constants';
import { INTEGRATION_SECRET_FORM_NAMES, JIRA_SERVER_FORM_NAMES } from './names';

export type FormNames = ValueOf<typeof FORM_NAMES>;

export interface ManageJiraServerProps {
  secret: SecretKubeObjectInterface;
  jiraServer: JiraServerKubeObjectInterface;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}

export type JiraServerFormValues = FormValues<typeof JIRA_SERVER_FORM_NAMES>;

export type IntegrationSecretFormValues = FormValues<typeof INTEGRATION_SECRET_FORM_NAMES>;
