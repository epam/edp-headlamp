import { TriggerTemplateKubeObjectInterface } from '../../../../../k8s/groups/Tekton/TriggerTemplate/types';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { DataProviderValue } from '../../../../../types/pages';
import { ManageStageDialogProps } from '../../types';

export interface CurrentDialogContextProviderProps extends ManageStageDialogProps {}

export interface CurrentDialogContextProviderValue extends CurrentDialogContextProviderProps {
  extra: {
    cleanTriggerTemplateList: DataProviderValue<
      KubeObjectListInterface<TriggerTemplateKubeObjectInterface> | undefined
    >;
    deployTriggerTemplateList: DataProviderValue<
      KubeObjectListInterface<TriggerTemplateKubeObjectInterface> | undefined
    >;
  };
}
