import React from 'react';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { MANAGE_QUICK_LINK_DIALOG_NAME } from '../../../constants';
import { QUICK_LINK_FORM_NAMES } from '../../../names';
import { ManageQuickLinkDialogForwardedProps } from '../../../types';

export const useDefaultValues = () => {
  const {
    forwardedProps: { QuickLink },
  } = useSpecificDialogContext<ManageQuickLinkDialogForwardedProps>(MANAGE_QUICK_LINK_DIALOG_NAME);

  return React.useMemo(
    () => ({
      [QUICK_LINK_FORM_NAMES.icon.name]: QuickLink?.spec.icon,
      [QUICK_LINK_FORM_NAMES.url.name]: QuickLink?.spec.url,
      [QUICK_LINK_FORM_NAMES.visible.name]: QuickLink?.spec.visible,
    }),
    [QuickLink]
  );
};
