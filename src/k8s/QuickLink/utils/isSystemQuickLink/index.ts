import { ValueOf } from '../../../../types/global';
import { SYSTEM_QUICK_LINKS } from '../../constants';
import { QuickLinkKubeObjectInterface } from '../../types';

type allowedType = ValueOf<typeof SYSTEM_QUICK_LINKS> & string;

export const isSystemQuickLink = (component: QuickLinkKubeObjectInterface) => {
  if (!component) {
    return false;
  }

  const allowedTypes: Array<allowedType> = Object.values(SYSTEM_QUICK_LINKS);
  return allowedTypes.includes(component.metadata.name as allowedType);
};
