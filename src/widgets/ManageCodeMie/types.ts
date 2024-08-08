import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { CodemieKubeObjectInterface } from '../../k8s/groups/EDP/Codemie/types';
import { QuickLinkKubeObjectInterface } from '../../k8s/groups/EDP/QuickLink/types';
import { FormValues } from '../../types/forms';
import { ValueOf } from '../../types/global';
import { FORM_NAMES } from './constants';
import { CODEMIE_FORM_NAMES, CODEMIE_SECRET_FORM_NAMES, QUICK_LINK_FORM_NAMES } from './names';

export type FormNames = ValueOf<typeof FORM_NAMES>;

export interface ManageCodeMieProps {
  quickLink: QuickLinkKubeObjectInterface;
  codemie: CodemieKubeObjectInterface;
  codemieSecret: SecretKubeObjectInterface;
  handleClosePanel?: () => void;
}

export type QuickLinkFormValues = FormValues<typeof QUICK_LINK_FORM_NAMES>;

export type CodemieFormValues = FormValues<typeof CODEMIE_FORM_NAMES>;

export type CodemieSecretFormValues = FormValues<typeof CODEMIE_SECRET_FORM_NAMES>;
