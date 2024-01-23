import React from 'react';
import { EDP_COMPONENT_FORM_NAMES } from '../../../names';

export const useDefaultValues = () => {
  return React.useMemo(
    () => ({
      [EDP_COMPONENT_FORM_NAMES.visible.name]: true,
    }),
    []
  );
};
