import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useEditCDPipeline } from '../../../../../../k8s/EDPCDPipeline/hooks/useEditCDPipeline';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import {
    CreateEditCDPipelineDialogForwardedProps,
    CreateEditCDPipelineFormValues,
} from '../../../../types';

export const FormActions = () => {
    const {
        forwardedProps: { CDPipelineData },
        closeDialog,
    } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
        CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
    );
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useFormContext<CreateEditCDPipelineFormValues>();

    const handleClose = React.useCallback(() => {
        closeDialog();
        reset();
    }, [closeDialog, reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        editCDPipeline,
        mutations: { CDPipelineEditMutation },
    } = useEditCDPipeline({
        onSuccess: handleClose,
    });

    const isLoading = React.useMemo(
        () => CDPipelineEditMutation.isLoading,
        [CDPipelineEditMutation.isLoading]
    );

    const onSubmit = React.useCallback(
        async (values: CreateEditCDPipelineFormValues) => {
            const usedValues = getUsedValues(values, CDPIPELINE_FORM_NAMES);
            const newCDPipelineData = editResource(
                CDPIPELINE_FORM_NAMES,
                CDPipelineData,
                usedValues
            );

            await editCDPipeline({ CDPipelineData: newCDPipelineData });
        },
        [CDPipelineData, editCDPipeline]
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
                disabled={!isDirty || isLoading}
            >
                apply
            </Button>
        </>
    );
};
