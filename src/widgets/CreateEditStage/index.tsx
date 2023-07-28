import { Dialog } from '@material-ui/core';
import React from 'react';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from './constants';
import { CreateEditStageDialogForwardedProps } from './types';

export const CreateEditStage = () => {
    const { dialogProviderState, closeDialog } =
        useDialogContext<CreateEditStageDialogForwardedProps>();

    const mode = dialogProviderState?.[CREATE_EDIT_STAGE_DIALOG_NAME].forwardedProps?.mode;

    return (
        <Dialog
            open={dialogProviderState?.[CREATE_EDIT_STAGE_DIALOG_NAME].open}
            onClose={() => closeDialog(CREATE_EDIT_STAGE_DIALOG_NAME)}
            maxWidth={'md'}
            fullWidth
        >
            {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
        </Dialog>
    );
};
