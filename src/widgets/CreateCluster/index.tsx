import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { DialogHeader } from './components/DialogHeader';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { CREATE_CLUSTER_DIALOG_NAME } from './constants';

export const CreateCluster = () => {
    const { dialogProviderState, closeDialog } = useDialogContext();
    const [editorOpen, setEditorOpen] = React.useState<boolean>(false);
    const [editorData, setEditorData] = React.useState<SecretKubeObjectInterface>(null);

    return (
        <Dialog
            open={dialogProviderState?.[CREATE_CLUSTER_DIALOG_NAME].open}
            onClose={() => closeDialog(CREATE_CLUSTER_DIALOG_NAME)}
            fullWidth
        >
            <FormContextProvider
                formSettings={{
                    mode: 'onBlur',
                }}
            >
                <DialogTitle>
                    <DialogHeader setEditorData={setEditorData} setEditorOpen={setEditorOpen} />
                </DialogTitle>
                <DialogContent>
                    <Form
                        editorOpen={editorOpen}
                        editorData={editorData}
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
