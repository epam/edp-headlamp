import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { FormDefaultValues } from './components/FormDefaultValues';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { CreateCodebaseFromTemplateDialogForwardedProps } from './types';

export const CreateCodebaseFromTemplate = () => {
    const { dialogProviderState, closeDialog } =
        useDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>();

    const baseDefaultValues = useDefaultValues();

    const {
        forwardedProps: {
            template: {
                spec: { type: codebaseType, displayName: templateName },
            },
        },
    } = dialogProviderState?.[CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME];

    return (
        <Dialog
            open={dialogProviderState?.[CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME].open}
            onClose={() => closeDialog(CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME)}
            maxWidth={'md'}
            fullWidth
        >
            <FormContextProvider
                formSettings={{
                    defaultValues: baseDefaultValues,
                    mode: 'onBlur',
                }}
            >
                <DialogTitle>
                    <Typography variant={'h5'}>
                        Creating {codebaseType} from <strong>"{templateName}"</strong> template
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <FormDefaultValues />
                    <Form />
                </DialogContent>
                <DialogActions>
                    <FormActions />
                </DialogActions>
            </FormContextProvider>
        </Dialog>
    );
};
