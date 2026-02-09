import { Dialog } from '@mui/material';
import React from 'react';
import { Create } from './components/Create';
import { DIALOG_NAME } from './constants';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { ManageVClusterDialogProps } from './types';

export const ManageVClusterDialog: React.FC<ManageVClusterDialogProps> = ({ props, state }) => {
  return (
    <Dialog open={state.open} maxWidth={'md'} fullWidth data-testid="dialog">
      <CurrentDialogContextProvider props={props} state={state}>
        <Create />
      </CurrentDialogContextProvider>
    </Dialog>
  );
};

ManageVClusterDialog.displayName = DIALOG_NAME;
