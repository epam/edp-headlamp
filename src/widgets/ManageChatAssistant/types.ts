import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { QuickLinkKubeObjectInterface } from '../../k8s/groups/EDP/QuickLink/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { FORM_MODES, FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES, widgetPermissionsToCheck } from './constants';
import { INTEGRATION_SECRET_FORM_NAMES, QUICK_LINK_FORM_NAMES } from './names';

export type FormNames = ValueOf<typeof FORM_NAMES>;

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export interface ManageChatAssistantProps {
  secret: SecretKubeObjectInterface | undefined;
  quickLink: QuickLinkKubeObjectInterface | undefined;
  mode: ValueOf<typeof FORM_MODES>;
  ownerReference: string | undefined;
  permissions: WidgetPermissions;
  handleClosePanel?: () => void;
}

export type QuickLinkFormValues = FormValues<typeof QUICK_LINK_FORM_NAMES>;

export type IntegrationSecretFormValues = FormValues<typeof INTEGRATION_SECRET_FORM_NAMES>;
