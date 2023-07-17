import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useDialogContext } from '../../providers/Dialog/hooks';
import { FormContextProvider } from '../../providers/Form';
import { Form } from './components/Form';
import { FormActions } from './components/FormActions';
import { FormDefaultValues } from './components/FormDefaultValues';
import { useDefaultValues } from './hooks/useDefaultValues';
import { CreateCodebaseFromTemplateDialogForwardedProps } from './types';

export const CreateCodebaseFromTemplate = () => {
    const { activeDialog, closeDialog } =
        useDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>();

    const baseDefaultValues = useDefaultValues({
        template: activeDialog?.forwardedProps?.template,
    });

    if (!activeDialog) {
        return null;
    }

    const {
        forwardedProps: {
            template: {
                spec: { type: codebaseType, displayName: templateName },
            },
        },
    } = activeDialog;

    return (
        <FormContextProvider
            formSettings={{
                defaultValues: baseDefaultValues,
                mode: 'onBlur',
            }}
        >
            <Dialog open={activeDialog.open} onClose={closeDialog} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Typography variant={'h5'}>
                                Creating {codebaseType} from <strong>"{templateName}"</strong>{' '}
                                template
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <FormDefaultValues />
                    <Form />
                </DialogContent>
                <DialogActions>
                    <FormActions />
                </DialogActions>
            </Dialog>
        </FormContextProvider>
    );
};
