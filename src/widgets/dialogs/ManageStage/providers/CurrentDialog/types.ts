import { PipelineKubeObjectInterface } from '../../../../../k8s/groups/Tekton/Pipeline/types';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { DataProviderValue } from '../../../../../types/pages';
import { ManageStageDialogProps } from '../../types';

export interface CurrentDialogContextProviderProps extends ManageStageDialogProps {}

export interface CurrentDialogContextProviderValue extends CurrentDialogContextProviderProps {
  extra: {
    buildPipelines: DataProviderValue<KubeObjectListInterface<PipelineKubeObjectInterface>>;
    reviewPipelines: DataProviderValue<KubeObjectListInterface<PipelineKubeObjectInterface>>;
  };
}
