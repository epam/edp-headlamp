import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { editResource } from '../../../../k8s/common/editResource';
import { useEDPComponentCRUD } from '../../../../k8s/EDPComponent/hooks/useEDPComponentCRUD';
import { useFormContext } from '../../../../providers/Form/hooks';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentDataContext, ManageEDPComponentValues } from '../../types';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageEDPComponentValues>();

    const {
        formData: { EDPComponent },
    } = useFormContext<ManageEDPComponentDataContext>();

    const handleClose = React.useCallback(() => {
        reset();
    }, [reset]);

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
        [editEDPComponent, EDPComponent]
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
