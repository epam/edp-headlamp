import { Dialog } from '@mui/material';
import React from 'react';
import { FORM_MODES } from '../../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { DIALOG_NAME } from './constants';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { ManageCodebaseBranchDialogProps } from './types';

export const ManageCodebaseBranchDialog: React.FC<ManageCodebaseBranchDialogProps> = (props) => {
  const {
    props: { codebaseBranch },
    state: { open },
  } = props;

  const mode = !!codebaseBranch ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  return (
    <Dialog open={open} fullWidth data-testid="dialog" maxWidth="md">
      <CurrentDialogContextProvider {...props}>
        {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
      </CurrentDialogContextProvider>
    </Dialog>
  );
};

ManageCodebaseBranchDialog.displayName = DIALOG_NAME;
