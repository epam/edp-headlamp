import { Dialog } from '@mui/material';
import React from 'react';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from './constants';
import { CreateEditStageDialogForwardedProps } from './types';

export const CreateEditStage = () => {
  const {
    open,
    forwardedProps: { mode },
  } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(CREATE_EDIT_STAGE_DIALOG_NAME);

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth data-testid="dialog">
      {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
    </Dialog>
  );
};
