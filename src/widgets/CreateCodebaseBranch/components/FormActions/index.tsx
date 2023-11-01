import { Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useCreateCodebaseBranch } from '../../../../k8s/EDPCodebaseBranch/hooks/useCreateCodebaseBranch';
import { createCodebaseBranchInstance } from '../../../../k8s/EDPCodebaseBranch/utils/createCodebaseBranchInstance';
import { editCodebaseBranchInstance } from '../../../../k8s/EDPCodebaseBranch/utils/editCodebaseBranchInstance';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../../constants';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../names';
import {
    CreateCodebaseBranchDialogForwardedProps,
    CreateCodebaseBranchFormValues,
} from '../../types';

export const FormActions = () => {
    const {
        forwardedProps: { codebase: codebaseData, defaultBranch },
        closeDialog,
    } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
        CREATE_CODEBASE_BRANCH_DIALOG_NAME
    );

    const {
        reset,
        formState: { isDirty },
        watch,
        handleSubmit,
    } = useFormContext<CreateCodebaseBranchFormValues>();

    const handleResetFields = React.useCallback(() => {
        reset();
    }, [reset]);

    const defaultBranchVersionFieldValue = watch(
        CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name
    );
    const defaultBranchPostfixFieldValue = watch(
        CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name
    );
    const newDefaultBranchVersion = React.useMemo(
        () =>
            createVersioningString(defaultBranchVersionFieldValue, defaultBranchPostfixFieldValue),
        [defaultBranchPostfixFieldValue, defaultBranchVersionFieldValue]
    );

    const {
        createCodebaseBranch,
        mutations: { codebaseBranchCreateMutation, codebaseBranchEditMutation },
    } = useCreateCodebaseBranch({
        onSuccess: async () => {
            closeDialog();
        },
    });

    const isLoading = React.useMemo(
        () => codebaseBranchCreateMutation.isLoading || codebaseBranchEditMutation.isLoading,
        [codebaseBranchCreateMutation.isLoading, codebaseBranchEditMutation.isLoading]
    );

    const onSubmit = React.useCallback(
        async (values: CreateCodebaseBranchFormValues) => {
            console.log(values);
            const usedValues = getUsedValues(values, CODEBASE_BRANCH_FORM_NAMES);

            const codebaseBranchInstance = createCodebaseBranchInstance(
                CODEBASE_BRANCH_FORM_NAMES,
                usedValues,
                codebaseData.metadata.name
            );

            if (!!values.release) {
                const newDefaultBranch = editCodebaseBranchInstance(
                    {
                        version: {
                            name: 'version',
                            path: ['spec', 'version'],
                        },
                    },
                    defaultBranch,
                    { version: newDefaultBranchVersion }
                );
                await createCodebaseBranch({
                    codebaseBranchData: codebaseBranchInstance,
                    defaultCodebaseBranchData: newDefaultBranch,
                });
            } else {
                await createCodebaseBranch({
                    codebaseBranchData: codebaseBranchInstance,
                });
            }
            reset();
        },
        [
            codebaseData.metadata.name,
            reset,
            defaultBranch,
            newDefaultBranchVersion,
            createCodebaseBranch,
        ]
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
                onClick={closeDialog}
                size="small"
                component={'button'}
                style={{ marginLeft: 'auto' }}
            >
                cancel
            </Button>
            <Button
                variant={'contained'}
                color={'primary'}
                size="small"
                disabled={!isDirty || isLoading}
                onClick={handleSubmit(onSubmit)}
            >
                apply
            </Button>
        </>
    );
};
