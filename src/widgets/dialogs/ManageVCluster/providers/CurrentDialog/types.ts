import { ConfigMapKubeObjectInterface } from '../../../../../k8s/groups/default/ConfigMap/types';
import { ManageVClusterDialogProps } from '../../types';

export interface CurrentDialogContextProviderProps extends ManageVClusterDialogProps {}

export interface CurrentDialogContextProviderValue extends CurrentDialogContextProviderProps {
  extra: {
    EDPConfigMap: ConfigMapKubeObjectInterface | undefined;
  };
}
