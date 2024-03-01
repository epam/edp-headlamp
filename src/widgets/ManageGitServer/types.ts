import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { GIT_SERVER_FORM_NAMES } from './names';

export interface ManageGitServerDataContext {
  gitServer: EDPGitServerKubeObjectInterface;
  repositorySecrets: SecretKubeObjectInterface[];
  mode: ValueOf<typeof FORM_MODES>;
  handleClosePanel?: () => void;
}

export interface ManageGitServerProps {
  formData: {
    gitServers: EDPGitServerKubeObjectInterface[];
    repositorySecrets: SecretKubeObjectInterface[];
  };
}

export type ManageGitServerValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;
