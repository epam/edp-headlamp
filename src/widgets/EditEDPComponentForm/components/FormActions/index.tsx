import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { editResource } from '../../../../k8s/common/editResource';
import { useCreateEDPComponent } from '../../../../k8s/EDPComponent/hooks/useCreateEDPComponent';
import { EDP_COMPONENT_FORM_NAMES } from '../../names';
import { ManageEDPComponentValues } from '../../types';
import { FormActionsProps } from './types';

export const FormActions = ({ EDPComponent }: FormActionsProps) => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useFormContext<ManageEDPComponentValues>();

    const handleClose = React.useCallback(() => {
        reset();
    }, [reset]);

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const {
        editEDPComponent,
        mutations: { EDPComponentEditMutation },
    } = useCreateEDPComponent({
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
