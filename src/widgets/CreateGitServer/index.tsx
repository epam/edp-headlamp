import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { EDPGitServerKubeObjectInterface } from '../../k8s/EDPGitServer/types';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { CREATE_GIT_SERVER_DIALOG_NAME } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { useStyles } from './styles';

export const CreateGitServer = () => {
    const classes = useStyles();

    const { dialogProviderState, closeDialog } = useDialogContext<{}>();

    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [editorData, setEditorData] = React.useState<EDPGitServerKubeObjectInterface>(null);

    const baseDefaultValues = useDefaultValues();

    return (
        <Dialog
            open={dialogProviderState?.[CREATE_GIT_SERVER_DIALOG_NAME].open}
            onClose={() => closeDialog(CREATE_GIT_SERVER_DIALOG_NAME)}
            fullWidth
            maxWidth={'md'}
            className={classes.dialogRoot}
        >
            <FormContextProvider
                formSettings={{
                    defaultValues: baseDefaultValues,
                    mode: 'onChange',
                }}
            >
                <DialogTitle>
                    <DialogHeader setEditorOpen={setEditorOpen} setEditorData={setEditorData} />
                </DialogTitle>
                <DialogContent>
                    <Form
                        editorData={editorData}
                        editorOpen={editorOpen}
                        setEditorOpen={setEditorOpen}
                    />
                </DialogContent>
                <DialogActions>
                    <FormActions />
                </DialogActions>
            </FormContextProvider>
        </Dialog>
    );
};
