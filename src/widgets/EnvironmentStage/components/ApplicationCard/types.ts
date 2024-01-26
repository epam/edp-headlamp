import { ApplicationKubeObjectInterface } from '../../../../k8s/Application/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

export interface ApplicationCardProps {
  stage: EDPCDPipelineStageKubeObjectInterface;
  application: EDPCodebaseKubeObjectInterface;
  argoApplication: ApplicationKubeObjectInterface;
}
