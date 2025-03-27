import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { GitServerKubeObjectInterface } from '../../k8s/groups/EDP/GitServer/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES, widgetPermissionsToCheck } from './constants';
import { CREDENTIALS_FORM_NAME, GIT_SERVER_FORM_NAMES, SHARED_FORM_NAMES } from './names';

export type FormNames = Exclude<ValueOf<typeof FORM_NAMES>, typeof FORM_NAMES.SHARED>;

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export interface ManageGitServerProps {
  gitServer: GitServerKubeObjectInterface | undefined;
  webhookURL: string | undefined;
  repositorySecrets: SecretKubeObjectInterface[];
  permissions: WidgetPermissions;
  handleClosePanel: (() => void) | undefined;
}

export type SharedFormValues = FormValues<typeof SHARED_FORM_NAMES>;

export type CredentialsFormValues = FormValues<typeof CREDENTIALS_FORM_NAME>;

export type GitServerFormValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;
