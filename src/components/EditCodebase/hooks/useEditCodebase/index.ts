import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { EDPCodebaseKubeObjectInterface } from '../../../../k8s/EDPCodebase/types';
import { React } from '../../../../plugin.globals';

interface EditCodebaseProps {
    codebaseData: EDPCodebaseKubeObjectInterface;
}

export const useEditCodebase = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    editCodebase: (props: EditCodebaseProps) => Promise<void>;
    mutations: {
        codebaseEditMutation: UseMutationResult<
            EDPCodebaseKubeObjectInterface,
            Error,
            { codebaseData: EDPCodebaseKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const codebaseEditMutation = useMutation<
        EDPCodebaseKubeObjectInterface,
        Error,
        {
            codebaseData: EDPCodebaseKubeObjectInterface;
        }
    >(
        'codebaseEditMutation',
        ({ codebaseData }) => {
            return EDPCodebaseKubeObject.apiEndpoint.put(codebaseData);
        },
        {
            onMutate: ({ codebaseData }) =>
                showBeforeRequestMessage(codebaseData.metadata.name, CRUD_TYPES.EDIT),
            onSuccess: (data, { codebaseData }) => {
                showRequestSuccessMessage(codebaseData.metadata.name, CRUD_TYPES.EDIT);
            },
            onError: (error, { codebaseData }) => {
                showRequestErrorMessage(codebaseData.metadata.name, CRUD_TYPES.EDIT);
            },
        }
    );

    const editCodebase = React.useCallback(
        async ({ codebaseData }: EditCodebaseProps) => {
            codebaseEditMutation.mutate(
                { codebaseData },
                {
                    onSuccess: () => {
                        invokeOnSuccessCallback();
                    },
                    onError: () => {
                        invokeOnErrorCallback();
                    },
                }
            );
        },
        [codebaseEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        codebaseEditMutation,
    };

    return { editCodebase, mutations };
};
