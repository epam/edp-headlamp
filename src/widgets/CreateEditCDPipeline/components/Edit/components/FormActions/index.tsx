import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useEditCDPipeline } from '../../../../../../k8s/EDPCDPipeline/hooks/useEditCDPipeline';
import { editCDPipelineInstance } from '../../../../../../k8s/EDPCDPipeline/utils/editCDPipelineInstance';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../names';
import {
    CreateEditCDPipelineDialogForwardedProps,
    CreateEditCDPipelineFormValues,
} from '../../../../types';

export const FormActions = () => {
    const { dialogProviderState, closeDialog } =
        useDialogContext<CreateEditCDPipelineDialogForwardedProps>();
    const CDPipelineData =
        dialogProviderState?.[CREATE_EDIT_CD_PIPELINE_DIALOG_NAME].forwardedProps?.CDPipelineData;
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useFormContext<CreateEditCDPipelineFormValues>();

    const handleClose = React.useCallback(() => {
        closeDialog(CREATE_EDIT_CD_PIPELINE_DIALOG_NAME);
        reset();
    }, [closeDialog, reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        editCDPipeline,
        mutations: { CDPipelineEditMutation },
    } = useEditCDPipeline({
        onSuccess: () => closeDialog(CREATE_EDIT_CD_PIPELINE_DIALOG_NAME),
    });

    const isLoading = React.useMemo(
        () => CDPipelineEditMutation.isLoading,
        [CDPipelineEditMutation.isLoading]
    );

    const onSubmit = React.useCallback(
        async (values: CreateEditCDPipelineFormValues) => {
            const usedValues = getUsedValues(values, CDPIPELINE_FORM_NAMES);
            const newCDPipelineData = editCDPipelineInstance(
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
