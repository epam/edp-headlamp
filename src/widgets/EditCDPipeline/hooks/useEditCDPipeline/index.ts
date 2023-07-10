import React from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';

interface EditCDPipelineProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
}

export const useEditCDPipeline = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const CDPipelineEditMutation = useResourceCRUDMutation<
        EDPCDPipelineKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('CDPipelineEditMutation', EDPCDPipelineKubeObject, CRUD_TYPES.EDIT);

    const editCDPipeline = React.useCallback(
        async ({ CDPipelineData }: EditCDPipelineProps) => {
            CDPipelineEditMutation.mutate(CDPipelineData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [CDPipelineEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        CDPipelineEditMutation,
    };

    return { editCDPipeline, mutations };
};
