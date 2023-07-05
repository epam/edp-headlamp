import React from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';

interface CreateCDPipelineStageProps {
    CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
}

export const useCreateCDPipelineStage = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const CDPipelineStageCreateMutation = useResourceCRUDMutation<
        EDPCDPipelineStageKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('CDPipelineStageCreateMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.CREATE);

    const createCDPipelineStage = React.useCallback(
        async ({ CDPipelineStageData }: CreateCDPipelineStageProps) => {
            CDPipelineStageCreateMutation.mutate(CDPipelineStageData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [CDPipelineStageCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        CDPipelineStageCreateMutation,
    };

    return { createCDPipelineStage, mutations };
};
