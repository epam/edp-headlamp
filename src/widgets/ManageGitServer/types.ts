import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { GIT_SERVER_FORM_NAMES } from './names';

export interface ManageGitServerDataContext {
    currentElement: EDPGitServerKubeObjectInterface | 'placeholder';
    mode?: ValueOf<typeof FORM_MODES>;
    handleClosePlaceholder?: () => void;
}

export interface ManageGitServerProps {
    formData: ManageGitServerDataContext;
}

export type ManageGitServerValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;
