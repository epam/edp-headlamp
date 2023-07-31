import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateCodebase } from '../../../../k8s/EDPCodebase/hooks/useCreateCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { createCodebaseInstance } from '../../../../k8s/EDPCodebase/utils/createCodebaseInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME } from '../../constants';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../names';
import {
    CreateCodebaseFromTemplateDialogForwardedProps,
    CreateCodebaseFromTemplateFormValues,
} from '../../types';

export const FormActions = () => {
    const { closeDialog } =
        useSpecificDialogContext<CreateCodebaseFromTemplateDialogForwardedProps>(
            CREATE_CODEBASE_FROM_TEMPLATE_DIALOG_NAME
        );

    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useFormContext<CreateCodebaseFromTemplateFormValues>();

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
