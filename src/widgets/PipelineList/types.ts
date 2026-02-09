import { PipelineKubeObjectInterface } from '../../k8s/groups/Tekton/Pipeline/types';
import { PipelineRunKubeObjectInterface } from '../../k8s/groups/Tekton/PipelineRun/types';
import { TriggerTemplateKubeObjectInterface } from '../../k8s/groups/Tekton/TriggerTemplate/types';
import { ControlName } from '../../providers/Filter/types';
import { PermissionsConfig } from '../../providers/Permissions/types';
import { ValueOf } from '../../types/global';
import { DataProviderValue } from '../../types/pages';
import { widgetPermissionsToCheck } from '../PipelineActionsMenu/constants';
import { pipelineFilterControlNames } from './constants';

export interface PipelineListProps {
  pipelines: DataProviderValue<PipelineKubeObjectInterface[]>;
  triggerTemplates: DataProviderValue<TriggerTemplateKubeObjectInterface[]>;
  permissions: WidgetPermissions;
}

export type WidgetPermissions = PermissionsConfig<typeof widgetPermissionsToCheck>;

export type PipelineFilterControlNames = ValueOf<typeof pipelineFilterControlNames>;

export type PipelineFilterAllControlNames = ControlName<PipelineFilterControlNames>;

export type MatchFunctions = {
  [key in PipelineFilterAllControlNames]?: (
    item: PipelineRunKubeObjectInterface,
    value: string | string[]
  ) => boolean;
};
