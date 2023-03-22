import { useCallback } from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCodebaseBranchKubeObject } from '../../../../k8s/EDPCodebaseBranch';
import { EDPCodebaseBranchKubeObjectInterface } from '../../../../k8s/EDPCodebaseBranch/types';
import { React } from '../../../../plugin.globals';

interface CreateCodebaseBranchProps {
    codebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
    defaultCodebaseBranchData: EDPCodebaseBranchKubeObjectInterface;
}

export const useCreateCodebaseBranch = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

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
