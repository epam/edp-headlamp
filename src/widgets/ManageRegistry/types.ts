import { ConfigMapKubeObjectInterface } from '../../k8s/groups/default/ConfigMap/types';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { ServiceAccountKubeObjectInterface } from '../../k8s/groups/default/ServiceAccount/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES, widgetPermissionsToCheck } from './constants';
import {
  CONFIG_MAP_FORM_NAMES,
  PULL_ACCOUNT_FORM_NAMES,
  PUSH_ACCOUNT_FORM_NAMES,
  SERVICE_ACCOUNT_FORM_NAMES,
  SHARED_FORM_NAMES,
} from './names';

export type FormNames = Exclude<ValueOf<typeof FORM_NAMES>, typeof FORM_NAMES.SHARED>;

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export interface ManageRegistryProps {
  EDPConfigMap: ConfigMapKubeObjectInterface | undefined;
  pushAccountSecret: SecretKubeObjectInterface | undefined;
  pullAccountSecret: SecretKubeObjectInterface | undefined;
  tektonServiceAccount: ServiceAccountKubeObjectInterface | undefined;
  permissions: WidgetPermissions;
  handleCloseCreateDialog?: () => void;
}

export type SharedFormValues = FormValues<typeof SHARED_FORM_NAMES>;

export type ConfigMapFormValues = FormValues<typeof CONFIG_MAP_FORM_NAMES>;

export type ServiceAccountFormValues = FormValues<typeof SERVICE_ACCOUNT_FORM_NAMES>;

export type PushAccountFormValues = FormValues<typeof PUSH_ACCOUNT_FORM_NAMES>;

export type PullAccountFormValues = FormValues<typeof PULL_ACCOUNT_FORM_NAMES>;
