import { Dialog } from '@mui/material';
import React from 'react';
import { FORM_MODES } from '../../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { DIALOG_NAME } from './constants';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { ManageCodebaseDialogProps } from './types';

export const ManageCodebaseDialog: React.FC<ManageCodebaseDialogProps> = ({ props, state }) => {
  const { codebaseData } = props;

  const { open } = state;

  const mode = !!codebaseData ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth data-testid="dialog">
      <CurrentDialogContextProvider props={props} state={state}>
        {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
      </CurrentDialogContextProvider>
    </Dialog>
  );
};

ManageCodebaseDialog.displayName = DIALOG_NAME;
