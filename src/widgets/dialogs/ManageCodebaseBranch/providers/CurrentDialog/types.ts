import { PipelineKubeObjectInterface } from '../../../../../k8s/groups/Tekton/Pipeline/types';
import { ApiServiceBase, GitFusionApiService } from '../../../../../services/api';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { DataProviderValue } from '../../../../../types/pages';
import { ManageCodebaseBranchDialogProps } from '../../types';

export interface CurrentDialogContextProviderProps extends ManageCodebaseBranchDialogProps {}

export interface CurrentDialogContextProviderValue extends CurrentDialogContextProviderProps {
  extra: {
    buildPipelines: DataProviderValue<
      KubeObjectListInterface<PipelineKubeObjectInterface> | undefined
    >;
    reviewPipelines: DataProviderValue<
      KubeObjectListInterface<PipelineKubeObjectInterface> | undefined
    >;
    apiServiceBase: ApiServiceBase;
    gitFusionApiService: GitFusionApiService;
  };
}
