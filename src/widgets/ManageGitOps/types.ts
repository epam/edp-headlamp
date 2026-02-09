import { CodebaseKubeObjectInterface } from '../../k8s/groups/EDP/Codebase/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { FormValues } from '../../types/forms';
import { widgetPermissionsToCheck } from './constants';
import { CODEBASE_FORM_NAMES } from './names';

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export interface ManageGitOpsDataContext {
  currentElement: CodebaseKubeObjectInterface | 'placeholder';
  isReadOnly?: boolean;
  permissions: WidgetPermissions;
  handleClosePlaceholder?: () => void;
}

export interface ManageGitOpsProps {
  formData: ManageGitOpsDataContext;
}

export type ManageGitOpsValues = FormValues<typeof CODEBASE_FORM_NAMES>;
