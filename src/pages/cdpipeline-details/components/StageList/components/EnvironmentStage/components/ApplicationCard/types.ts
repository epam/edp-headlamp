import { ApplicationKubeObjectInterface } from '../../../../../../../../k8s/groups/ArgoCD/Application/types';
import { PodKubeObjectInterface } from '../../../../../../../../k8s/groups/default/Pod/types';
import { CDPipelineKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Codebase/types';
import { StageKubeObjectInterface } from '../../../../../../../../k8s/groups/EDP/Stage/types';

export interface ApplicationCardProps {
  stage: StageKubeObjectInterface;
  application: CodebaseKubeObjectInterface;
  argoApplication: ApplicationKubeObjectInterface;
  QuickLinksURLS: Record<string, string>;
  CDPipeline: CDPipelineKubeObjectInterface;
  stagePods: PodKubeObjectInterface[];
}
