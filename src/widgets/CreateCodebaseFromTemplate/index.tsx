import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React from 'react';
import { useSpecificDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { FormDefaultValues } from './components/FormDefaultValues';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from './constants';
import { useDefaultValues } from './hooks/useDefaultValues';
import { CreateCodebaseFromTemplateDialogForwardedProps } from './types';

export const CreateCodebaseFromTemplate = () => {
    const {
        open,
        forwardedProps: { template },
        closeDialog,
    } = useSpecificDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>(
        CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME
    );

    const baseDefaultValues = useDefaultValues();

    const {
        spec: { type: codebaseType, displayName: templateName },
    } = template;

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth={'md'} fullWidth data-testid="dialog">
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
