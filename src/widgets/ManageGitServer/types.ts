import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { FormValues } from '../../types/forms';
import { GIT_SERVER_FORM_NAMES } from './names';

export interface ManageGitServerDataContext {
    currentElement: EDPGitServerKubeObjectInterface | 'placeholder';
    isReadOnly?: boolean;
    handleClosePlaceholder?: () => void;
}

export interface ManageGitServerProps {
    formData: ManageGitServerDataContext;
}

export type ManageGitServerValues = FormValues<typeof GIT_SERVER_FORM_NAMES>;
