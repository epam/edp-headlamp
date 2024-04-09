import { Dialog } from '@mui/material';
import React from 'react';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from './constants';
import { CreateEditCDPipelineDialogForwardedProps } from './types';

export const CreateEditCDPipeline = () => {
  const {
    open,
    forwardedProps: { mode },
  } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );

  return (
    <Dialog open={open} maxWidth={'md'} fullWidth data-testid="dialog">
      {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
    </Dialog>
  );
};
