import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { QuickLinkKubeObjectInterface } from '../../../../k8s/groups/EDP/QuickLink/types';
import { FORM_MODES } from '../../../../types/forms';
import { ValueOf } from '../../../../types/global';

export interface DataContextProviderValue {
  secret: SecretKubeObjectInterface;
  quickLink: QuickLinkKubeObjectInterface;
  mode: ValueOf<typeof FORM_MODES>;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}

export interface DataContextProviderProps {
  secret: SecretKubeObjectInterface;
  quickLink: QuickLinkKubeObjectInterface;
  mode: ValueOf<typeof FORM_MODES>;
  ownerReference: string | undefined;
  handleClosePanel?: () => void;
}
