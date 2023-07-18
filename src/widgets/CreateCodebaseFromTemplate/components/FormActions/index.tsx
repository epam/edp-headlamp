import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateCodebase } from '../../../../k8s/EDPCodebase/hooks/useCreateCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { createCodebaseInstance } from '../../../../k8s/EDPCodebase/utils/createCodebaseInstance';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../names';

export const FormActions = () => {
    const { closeDialog } = useDialogContext();

    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useFormContext();

    const {
        createCodebase,
        mutations: { codebaseCreateMutation },
    } = useCreateCodebase({
        onSuccess: () => {
            closeDialog();
            reset();
        },
    });

    const onSubmit = React.useCallback(async () => {
        const values = getValues();
        const usedValues = getUsedValues(values, CODEBASE_FROM_TEMPLATE_FORM_NAMES);
        const codebaseInstance = createCodebaseInstance(
            CODEBASE_FROM_TEMPLATE_FORM_NAMES,
            usedValues
        );

        await createCodebase({
            codebaseData: codebaseInstance as EDPCodebaseKubeObjectInterface,
            codebaseAuthData: null,
        });
    }, [getValues, createCodebase]);

    return (
        <>
            <Button onClick={reset} size="small" component={'button'} disabled={!isDirty}>
                undo changes
            </Button>
            <Button
                onClick={closeDialog}
                size="small"
                component={'button'}
                style={{ marginLeft: 'auto' }}
            >
                cancel
            </Button>
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                size="small"
                disabled={!isDirty || codebaseCreateMutation.isLoading}
                onClick={handleSubmit(onSubmit)}
            >
                apply
            </Button>
        </>
    );
};
