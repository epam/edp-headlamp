import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../../../k8s/common/editResource';
import { useEDPComponentCRUD } from '../../../../../../k8s/EDPComponent/hooks/useEDPComponentCRUD';
import { useSpecificDialogContext } from '../../../../../../providers/Dialog/hooks';
import { MANAGE_EDP_COMPONENT_DIALOG_NAME } from '../../../../constants';
import { EDP_COMPONENT_FORM_NAMES } from '../../../../names';
import {
    ManageEDPComponentDialogForwardedProps,
    ManageEDPComponentValues,
} from '../../../../types';

export const FormActions = () => {
    const {
        forwardedProps: { EDPComponent },
        closeDialog,
    } = useSpecificDialogContext<ManageEDPComponentDialogForwardedProps>(
        MANAGE_EDP_COMPONENT_DIALOG_NAME
    );

    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useFormContext<ManageEDPComponentValues>();

    const handleClose = React.useCallback(() => {
        closeDialog();
        reset();
    }, [closeDialog, reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        editEDPComponent,
        mutations: { EDPComponentEditMutation },
    } = useEDPComponentCRUD({
        onSuccess: handleClose,
    });

    const isLoading = EDPComponentEditMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageEDPComponentValues) => {
            const editedEDPComponent = editResource(EDP_COMPONENT_FORM_NAMES, EDPComponent, {
                ...values,
                visible: JSON.parse(values.visible),
            });

            await editEDPComponent({ EDPComponentData: editedEDPComponent });
        },
        [EDPComponent, editEDPComponent]
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
