import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCodebaseCRUD } from '../../../../k8s/EDPCodebase/hooks/useCodebaseCRUD';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { createCodebaseInstance } from '../../../../k8s/EDPCodebase/utils/createCodebaseInstance';
import { useDefaultCIToolQuery } from '../../../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
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
    } = useFormContext<CreateCodebaseFromTemplateFormValues>();

    const {
        createCodebase,
        mutations: { codebaseCreateMutation },
    } = useCodebaseCRUD({
        onSuccess: () => {
            closeDialog();
            reset();
        },
    });

    const { data: defaultCITool } = useDefaultCIToolQuery();

    const onSubmit = React.useCallback(
        async values => {
            const usedValues = getUsedValues(values, CODEBASE_FROM_TEMPLATE_FORM_NAMES);

            const codebaseInstance = createCodebaseInstance(CODEBASE_FROM_TEMPLATE_FORM_NAMES, {
                ...usedValues,
                ciTool: defaultCITool,
            });

            await createCodebase({
                codebaseData: codebaseInstance as EDPCodebaseKubeObjectInterface,
                codebaseAuthData: null,
            });
        },
        [defaultCITool, createCodebase]
    );

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
