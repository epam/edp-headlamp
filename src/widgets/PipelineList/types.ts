import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { TriggerTemplateKubeObjectInterface } from '../../k8s/groups/Tekton/TriggerTemplate/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { DataProviderValue } from '../../types/pages';
import { widgetPermissionsToCheck } from '../PipelineActionsMenu/constants';

export interface PipelineListProps {
  pipelines: DataProviderValue<PipelineKubeObjectInterface[]>;
  triggerTemplates: DataProviderValue<TriggerTemplateKubeObjectInterface[]>;
  permissions: WidgetPermissions;
}

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;
