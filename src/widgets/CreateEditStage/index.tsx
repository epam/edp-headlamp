import { Dialog } from '@material-ui/core';
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
        closeDialog,
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth={'md'} fullWidth>
            {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
        </Dialog>
    );
};
