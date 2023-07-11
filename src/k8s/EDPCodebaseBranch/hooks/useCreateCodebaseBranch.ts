import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { EDPCodebaseBranchKubeObject } from '../index';
import { EDPCodebaseBranchKubeObjectInterface } from '../types';

interface CreateCodebaseBranchProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultCodebaseBranchData?: EDPCodebaseBranchKubeObjectInterface;
}

export const useCreateCodebaseBranch = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const codebaseBranchCreateMutation = useResourceCRUDMutation<
        EDPCodebaseBranchKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('codebaseBranchCreateMutation', EDPCodebaseBranchKubeObject, CRUD_TYPES.CREATE);

    const codebaseBranchEditMutation = useResourceCRUDMutation<
        EDPCodebaseBranchKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('codebaseBranchEditMutation', EDPCodebaseBranchKubeObject, CRUD_TYPES.EDIT);

    const createCodebaseBranch = React.useCallback(
        async ({ codebaseBranchData, defaultCodebaseBranchData }: CreateCodebaseBranchProps) => {
            codebaseBranchCreateMutation.mutate(codebaseBranchData, {
                onSuccess: () => {
                    if (defaultCodebaseBranchData) {
                        codebaseBranchEditMutation.mutate(defaultCodebaseBranchData);
                    }

                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [
            codebaseBranchCreateMutation,
            codebaseBranchEditMutation,
            invokeOnErrorCallback,
            invokeOnSuccessCallback,
        ]
    );

    const mutations = {
        codebaseBranchCreateMutation,
        codebaseBranchEditMutation,
    };

    return { createCodebaseBranch, mutations };
};
