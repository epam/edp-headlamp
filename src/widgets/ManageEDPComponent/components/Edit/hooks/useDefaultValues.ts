import React from 'react';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../../constants';
import { EDP_COMPONENT_FORM_NAMES } from '../../../names';
import { ManageEDPComponentDialogForwardedProps } from '../../../types';

export const useDefaultValues = () => {
  const {
    forwardedProps: { EDPComponent },
  } = useSpecificDialogContext<ManageEDPComponentDialogForwardedProps>(
    MANAGE_EDP_COMPONENT_DIALOG_NAME
  );

  return React.useMemo(
    () => ({
      [EDP_COMPONENT_FORM_NAMES.icon.name]: EDPComponent?.spec.icon,
      [EDP_COMPONENT_FORM_NAMES.url.name]: EDPComponent?.spec.url,
      [EDP_COMPONENT_FORM_NAMES.visible.name]: EDPComponent?.spec.visible,
    }),
    [EDPComponent]
  );
};
