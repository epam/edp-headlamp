import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { JiraServerKubeObjectInterface } from '../../k8s/groups/EDP/JiraServer/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES, widgetPermissionsToCheck } from './constants';
import { INTEGRATION_SECRET_FORM_NAMES, JIRA_SERVER_FORM_NAMES } from './names';

export type FormNames = ValueOf<typeof FORM_NAMES>;

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export interface ManageJiraServerProps {
  secret: SecretKubeObjectInterface | undefined;
  jiraServer: JiraServerKubeObjectInterface | undefined;
  ownerReference: string | undefined;
  permissions: WidgetPermissions;
  handleClosePanel?: () => void;
}

export type JiraServerFormValues = FormValues<typeof JIRA_SERVER_FORM_NAMES>;

export type IntegrationSecretFormValues = FormValues<typeof INTEGRATION_SECRET_FORM_NAMES>;
