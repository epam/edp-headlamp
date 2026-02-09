import React from 'react';
import { QUICK_LINK_FORM_NAMES } from '../../../names';

export const useDefaultValues = () => {
  return React.useMemo(
    () => ({
      [QUICK_LINK_FORM_NAMES.visible.name]: true,
    }),
    []
  );
};
