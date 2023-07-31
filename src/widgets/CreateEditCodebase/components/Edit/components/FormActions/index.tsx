import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useEditCodebase } from '../../../../../../k8s/EDPCodebase/hooks/useEditCodebase';
import { editCodebaseInstance } from '../../../../../../k8s/EDPCodebase/utils/editCodebaseInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_CODEBASE_DIALOG_NAME } from '../../../../constants';
import { CODEBASE_FORM_NAMES } from '../../../../names';
import { CreateEditCodebaseDialogForwardedProps } from '../../../../types';
import { EditCodebaseFormValues } from '../../types';

export const FormActions = () => {
    const {
        closeDialog,
        forwardedProps: { codebaseData },
    } = useSpecificDialogContext<CreateEditCodebaseDialogForwardedProps>(
        CREATE_EDIT_CODEBASE_DIALOG_NAME
    );

    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useFormContext<EditCodebaseFormValues>();

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const handleClose = React.useCallback(() => {
        closeDialog();
        reset();
    }, [closeDialog, reset]);

    const { editCodebase } = useEditCodebase({
        onSuccess: handleClose,
    });

    const onSubmit = React.useCallback(
        async values => {
            const { hasJiraServerIntegration } = values;

            const usedValues = getUsedValues(values, CODEBASE_FORM_NAMES);
            const formValues = hasJiraServerIntegration
                ? usedValues
                : {
                      ...usedValues,
                      jiraServer: null,
                      ticketNamePattern: null,
                      jiraIssueMetadataPayload: null,
                  };

            const updatedCodebaseData = editCodebaseInstance(
                CODEBASE_FORM_NAMES,
                codebaseData,
                formValues
            );

            await editCodebase({
                codebaseData: updatedCodebaseData,
            });
            reset();
        },
        [codebaseData, editCodebase, reset]
    );

    return (
        <>
            <Button
                onClick={handleResetFields}
                size="small"
                component={'button'}
                disabled={!isDirty}
            >
                undo changes
            </Button>
            <Button
                onClick={handleClose}
                size="small"
                component={'button'}
                style={{ marginLeft: 'auto' }}
            >
                cancel
            </Button>
            <Button
                onClick={handleSubmit(onSubmit)}
                variant={'contained'}
                color={'primary'}
                size="small"
                disabled={!isDirty}
            >
                apply
            </Button>
        </>
    );
};
