import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useEditCDPipelineStage } from '../../../../../../k8s/EDPCDPipelineStage/hooks/useEditCDPipelineStage';
import { editCDPipelineStageInstance } from '../../../../../../k8s/EDPCDPipelineStage/utils/editCDPipelineStageInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';

export const FormActions = () => {
    const {
        forwardedProps: { stage },
        closeDialog,
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useFormContext<CreateEditStageFormValues>();

    const handleClose = React.useCallback(() => {
        closeDialog();
        reset();
    }, [closeDialog, reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        editCDPipelineStage,
        mutations: { CDPipelineStageEditMutation },
    } = useEditCDPipelineStage({
        onSuccess: handleClose,
    });

    const isLoading = React.useMemo(
        () => CDPipelineStageEditMutation.isLoading,
        [CDPipelineStageEditMutation.isLoading]
    );

    const onSubmit = React.useCallback(
        async (values: CreateEditStageFormValues) => {
            const usedValues = getUsedValues(values, STAGE_FORM_NAMES);
            const newCDPipelineStageData = editCDPipelineStageInstance(
                STAGE_FORM_NAMES,
                stage,
                usedValues
            );

            await editCDPipelineStage({ CDPipelineStageData: newCDPipelineStageData });
        },
        [stage, editCDPipelineStage]
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
