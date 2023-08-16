import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { JIRA_INTEGRATION_SECRET_FORM_NAMES } from './names';

export interface ManageJiraIntegrationSecretFormDataContext {
    currentElement: SecretKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageJiraIntegrationSecretProps {
    formData: ManageJiraIntegrationSecretFormDataContext;
}

export type ManageJiraIntegrationSecretFormValues = FormValues<
    typeof JIRA_INTEGRATION_SECRET_FORM_NAMES
>;
