import { PermissionsConfig } from '../../../../providers/Permissions/types';
import { KubeObjectAction } from '../../../../types/actions';
import { widgetPermissionsToCheck } from '../../constants';

export interface CustomActionsInlineListProps {
  permissions: PermissionsConfig<typeof widgetPermissionsToCheck>;
  actions: KubeObjectAction[];
}
