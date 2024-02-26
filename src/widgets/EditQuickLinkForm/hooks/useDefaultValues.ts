import React from 'react';
import { QuickLinkKubeObjectInterface } from '../../../k8s/QuickLink/types';
import { QUICK_LINK_FORM_NAMES } from '../names';

export const useDefaultValues = ({ QuickLink }: { QuickLink: QuickLinkKubeObjectInterface }) => {
  return React.useMemo(
    () => ({
      [QUICK_LINK_FORM_NAMES.icon.name]: QuickLink?.spec.icon,
      [QUICK_LINK_FORM_NAMES.url.name]: QuickLink?.spec.url,
      [QUICK_LINK_FORM_NAMES.visible.name]: QuickLink?.spec.visible,
    }),
    [QuickLink]
  );
};
