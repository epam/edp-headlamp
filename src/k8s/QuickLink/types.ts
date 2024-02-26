import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { ValueOf } from '../../types/global';
import { SYSTEM_QUICK_LINKS } from './constants';

export interface QuickLinkSpec {
  icon: string;
  type: string | ValueOf<typeof SYSTEM_QUICK_LINKS>;
  url: string;
  visible: boolean;
}

export interface QuickLinkKubeObjectInterface extends KubeObjectInterface {
  spec: QuickLinkSpec;
  status: string;
}
