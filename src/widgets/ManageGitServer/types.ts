import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { CREDENTIALS_FORM_NAME, GIT_SERVER_FORM_NAMES } from './names';

export type FormName = 'gitServer' | 'credentials';
export type FormSharedValues = 'gitProvider';

export interface ManageGitServerProps {
  gitServer: EDPGitServerKubeObjectInterface;
  repositorySecrets: SecretKubeObjectInterface[];
  handleClosePanel: () => void;
}

export type CredentialsFormValues = FormValues<typeof CREDENTIALS_FORM_NAME>;

export type GitServerFormValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;
