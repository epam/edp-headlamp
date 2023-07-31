import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateCDPipelineStage } from '../../../../../../k8s/EDPCDPipelineStage/hooks/useCreateCDPipelineStage';
import { createCDPipelineStageInstance } from '../../../../../../k8s/EDPCDPipelineStage/utils/createCDPipelineStageInstance';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { CREATE_EDIT_STAGE_DIALOG_NAME } from '../../../../constants';
import { STAGE_FORM_NAMES } from '../../../../names';
import { CreateEditStageDialogForwardedProps, CreateEditStageFormValues } from '../../../../types';

export const FormActions = () => {
    const {
        forwardedProps: { CDPipelineData, handleApply: customHandleApply },
        closeDialog,
    } = useSpecificDialogContext<CreateEditStageDialogForwardedProps>(
        CREATE_EDIT_STAGE_DIALOG_NAME
    );

    const {
        reset,
        formState: { isDirty },
        watch,
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
        createCDPipelineStage,
        mutations: { CDPipelineStageCreateMutation },
    } = useCreateCDPipelineStage({
        onSuccess: handleClose,
    });

    const isLoading = React.useMemo(
        () => CDPipelineStageCreateMutation.isLoading,
        [CDPipelineStageCreateMutation.isLoading]
    );

    const onSubmit = React.useCallback(
        async (values: CreateEditStageFormValues) => {
            const usedValues = getUsedValues(values, STAGE_FORM_NAMES);
            const CDPipelineStageData = createCDPipelineStageInstance(
                STAGE_FORM_NAMES,
                usedValues,
                CDPipelineData
            );
            if (customHandleApply) {
                customHandleApply({
                    CDPipelineStageData,
                });
                closeDialog();
            } else {
                await createCDPipelineStage({
                    CDPipelineStageData,
                });
            }
        },
        [CDPipelineData, closeDialog, createCDPipelineStage, customHandleApply]
    );

    const qualityGatesFieldValue = watch(STAGE_FORM_NAMES.qualityGates.name);

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
                disabled={
                    !isDirty ||
                    isLoading ||
                    !qualityGatesFieldValue ||
                    !qualityGatesFieldValue.length
                }
            >
                apply
            </Button>
        </>
    );
};
