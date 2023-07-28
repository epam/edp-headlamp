import { Dialog } from '@material-ui/core';
import React from 'react';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from './constants';
import { CreateEditCodebaseDialogForwardedProps } from './types';

export const CreateEditCodebase = () => {
    const { dialogProviderState, closeDialog } =
        useDialogContext<CreateEditCodebaseDialogForwardedProps>();

    const mode = dialogProviderState?.[CREATE_EDIT_CODEBASE_DIALOG_NAME].forwardedProps?.mode;

    return (
        <Dialog
            open={dialogProviderState?.[CREATE_EDIT_CODEBASE_DIALOG_NAME].open}
            onClose={() => closeDialog(CREATE_EDIT_CODEBASE_DIALOG_NAME)}
            maxWidth={'md'}
            fullWidth
        >
            {mode === FORM_MODES.CREATE ? <Create /> : mode === FORM_MODES.EDIT ? <Edit /> : null}
        </Dialog>
    );
};
