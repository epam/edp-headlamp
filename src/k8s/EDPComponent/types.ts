import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ValueOf } from '../../types/global';
import { SYSTEM_EDP_COMPONENTS } from './constants';

export interface EDPComponentSpec {
  icon: string;
  type: string | ValueOf<typeof SYSTEM_EDP_COMPONENTS>;
  url: string;
  visible: boolean;
}

export interface EDPComponentKubeObjectInterface extends KubeObjectInterface {
  spec: EDPComponentSpec;
  status: string;
}
