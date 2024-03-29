import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES } from './constants';
import { CREDENTIALS_FORM_NAME, GIT_SERVER_FORM_NAMES, SHARED_FORM_NAMES } from './names';

export type FormNames = Exclude<ValueOf<typeof FORM_NAMES>, typeof FORM_NAMES.SHARED>;

export interface ManageGitServerProps {
  gitServer: EDPGitServerKubeObjectInterface;
  repositorySecrets: SecretKubeObjectInterface[];
  handleClosePanel: () => void;
}

export type SharedFormValues = FormValues<typeof SHARED_FORM_NAMES>;

export type CredentialsFormValues = FormValues<typeof CREDENTIALS_FORM_NAME>;

export type GitServerFormValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;
