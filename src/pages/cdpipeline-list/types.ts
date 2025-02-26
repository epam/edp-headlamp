import { CDPipelineKubeObjectInterface } from '../../k8s/groups/EDP/CDPipeline/types';
import { ControlName } from '../../providers/Filter/types';
import { ValueOf } from '../../types/global';
import { cdPipelineFilterControlNames } from './constants';

export type CDPipelineFilterControlNames = ValueOf<typeof cdPipelineFilterControlNames>;
export type CDPipelineFilterAllControlNames = ControlName<CDPipelineFilterControlNames>;

export type MatchFunctions = {
  [key in CDPipelineFilterAllControlNames]?: (
    item: CDPipelineKubeObjectInterface,
    value: string | string[]
  ) => boolean;
};
