import { GIT_PROVIDERS } from '../../../../constants/gitProviders';
import { EDPGitServerKubeObjectInterface } from '../../../../k8s/EDPGitServer/types';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
import { FORM_MODES } from '../../../../types/forms';
import { ValueOf } from '../../../../types/global';

export interface DataContextProviderValue {
  gitServer: EDPGitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
  chosenGitProvider: GIT_PROVIDERS;
  setChosenGitProvider: (value: GIT_PROVIDERS) => void;
  gitServerFormMode: ValueOf<typeof FORM_MODES>;
  credentialsFormMode: ValueOf<typeof FORM_MODES>;
  handleClosePanel?: () => void;
}

export interface DataContextProviderProps {
  gitServer: EDPGitServerKubeObjectInterface;
  gitServerSecret: SecretKubeObjectInterface;
  chosenGitProvider: GIT_PROVIDERS;
  setChosenGitProvider: (value: GIT_PROVIDERS) => void;
  gitServerFormMode: ValueOf<typeof FORM_MODES>;
  credentialsFormMode: ValueOf<typeof FORM_MODES>;
  handleClosePanel?: () => void;
}
