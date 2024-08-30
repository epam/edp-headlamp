import React from 'react';
import { QUICK_LINK_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const useDefaultValues = () => {
  const {
    props: { quickLink },
  } = useCurrentDialog();

  return React.useMemo(
    () => ({
      [QUICK_LINK_FORM_NAMES.icon.name]: quickLink?.spec.icon,
      [QUICK_LINK_FORM_NAMES.url.name]: quickLink?.spec.url,
      [QUICK_LINK_FORM_NAMES.visible.name]: quickLink?.spec.visible,
    }),
    [quickLink]
  );
};
