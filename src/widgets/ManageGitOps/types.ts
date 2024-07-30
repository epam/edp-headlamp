import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { FormValues } from '../../types/forms';
import { CODEBASE_FORM_NAMES } from './names';

export interface ManageGitOpsDataContext {
  currentElement: CodebaseKubeObjectInterface | 'placeholder';
  isReadOnly?: boolean;
  handleClosePlaceholder?: () => void;
}

export interface ManageGitOpsProps {
  formData: ManageGitOpsDataContext;
}

export type ManageGitOpsValues = FormValues<typeof CODEBASE_FORM_NAMES>;
