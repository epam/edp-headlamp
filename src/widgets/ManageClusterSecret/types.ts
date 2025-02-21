import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { FORM_MODES } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { widgetPermissionsToCheck } from './constants';
import { CLUSTER_FORM_NAMES } from './names';

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export interface ManageClusterSecretDataContext {
  handleClosePlaceholder?: () => void;
  mode: ValueOf<typeof FORM_MODES>;
  permissions: WidgetPermissions;
  currentElement?: SecretKubeObjectInterface;
  ownerReference: string | undefined;
}

export interface ManageClusterSecretProps {
  formData: ManageClusterSecretDataContext;
}

export type ManageClusterSecretValues = {
  [key in ValueOf<typeof CLUSTER_FORM_NAMES>]: any;
};
