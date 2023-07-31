import { Dialog } from '@material-ui/core';
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
        closeDialog,
    } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
        CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
    );

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth={'md'} fullWidth>
            {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
        </Dialog>
    );
};
