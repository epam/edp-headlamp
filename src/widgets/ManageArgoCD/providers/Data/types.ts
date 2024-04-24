import { QuickLinkKubeObjectInterface } from '../../../../k8s/QuickLink/types';
import { SecretKubeObjectInterface } from '../../../../k8s/Secret/types';
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
