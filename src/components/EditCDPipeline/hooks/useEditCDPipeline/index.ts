import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { React } from '../../../../plugin.globals';

interface EditCDPipelineProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
}

export const useEditCDPipeline = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    editCDPipeline: (props: EditCDPipelineProps) => Promise<void>;
    mutations: {
        CDPipelineEditMutation: UseMutationResult<
            EDPCDPipelineKubeObjectInterface,
            Error,
            { CDPipelineData: EDPCDPipelineKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const CDPipelineEditMutation = useMutation<
        EDPCDPipelineKubeObjectInterface,
        Error,
        {
            CDPipelineData: EDPCDPipelineKubeObjectInterface;
        }
    >(
        'CDPipelineEditMutation',
        ({ CDPipelineData }) => {
            return EDPCDPipelineKubeObject.apiEndpoint.put(CDPipelineData);
        },
        {
            onMutate: ({ CDPipelineData }) =>
                showBeforeRequestMessage(CDPipelineData.metadata.name, CRUD_TYPES.EDIT),
            onSuccess: (data, { CDPipelineData }) => {
                showRequestSuccessMessage(CDPipelineData.metadata.name, CRUD_TYPES.EDIT);
            },
            onError: (error, { CDPipelineData }) => {
                showRequestErrorMessage(CDPipelineData.metadata.name, CRUD_TYPES.EDIT);
            },
        }
    );

    const editCDPipeline = React.useCallback(
        async ({ CDPipelineData }: EditCDPipelineProps) => {
            CDPipelineEditMutation.mutate(
                { CDPipelineData },
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
        [CDPipelineEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        CDPipelineEditMutation,
    };

    return { editCDPipeline, mutations };
};
