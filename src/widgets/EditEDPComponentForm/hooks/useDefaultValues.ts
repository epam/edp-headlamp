import React from 'react';
import { EDPComponentKubeObjectInterface } from '../../../k8s/EDPComponent/types';
import { EDP_COMPONENT_FORM_NAMES } from '../names';

export const useDefaultValues = ({
  EDPComponent,
}: {
  EDPComponent: EDPComponentKubeObjectInterface;
}) => {
  return React.useMemo(
    () => ({
      [EDP_COMPONENT_FORM_NAMES.icon.name]: EDPComponent?.spec.icon,
      [EDP_COMPONENT_FORM_NAMES.url.name]: EDPComponent?.spec.url,
      [EDP_COMPONENT_FORM_NAMES.visible.name]: EDPComponent?.spec.visible,
    }),
    [EDPComponent]
  );
};
