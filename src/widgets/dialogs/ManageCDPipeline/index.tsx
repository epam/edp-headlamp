import { Dialog } from '@mui/material';
import React from 'react';
import { FORM_MODES } from '../../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { DIALOG_NAME } from './constants';
import { CurrentDialogContextProvider } from './providers/CurrentDialog/provider';
import { ManageCDPipelineDialogProps } from './types';

export const ManageCDPipelineDialog: React.FC<ManageCDPipelineDialogProps> = ({ props, state }) => {
  const { CDPipelineData } = props;
  const { open } = state;

  const mode = !!CDPipelineData ? FORM_MODES.EDIT : FORM_MODES.CREATE;

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth data-testid="dialog">
      <CurrentDialogContextProvider props={props} state={state}>
        {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
      </CurrentDialogContextProvider>
    </Dialog>
  );
};

ManageCDPipelineDialog.displayName = DIALOG_NAME;
