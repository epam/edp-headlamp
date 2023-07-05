import React from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';

interface EditCodebaseProps {
    codebaseData: EDPCodebaseKubeObjectInterface;
}

export const useEditCodebase = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const codebaseEditMutation = useResourceCRUDMutation<
        EDPCodebaseKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('codebaseEditMutation', EDPCodebaseKubeObject, CRUD_TYPES.EDIT);

    const editCodebase = React.useCallback(
        async ({ codebaseData }: EditCodebaseProps) => {
            codebaseEditMutation.mutate(codebaseData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [codebaseEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        codebaseEditMutation,
    };

    return { editCodebase, mutations };
};
