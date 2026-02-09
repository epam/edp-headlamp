import { Dialog } from '@mui/material';
import React from 'react';
import { FORM_MODES } from '../../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { DIALOG_NAME } from './constants';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { ManageQuickLinkDialogProps } from './types';

export const ManageQuickLinkDialog: React.FC<ManageQuickLinkDialogProps> = ({ props, state }) => {
  const mode = !!props.quickLink ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  return (
    <Dialog open={state.open} maxWidth={'md'} fullWidth data-testid="dialog">
      <CurrentDialogContextProvider props={props} state={state}>
        {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
      </CurrentDialogContextProvider>
    </Dialog>
  );
};

ManageQuickLinkDialog.displayName = DIALOG_NAME;
