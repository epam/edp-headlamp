import { useCallback } from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../plugin.globals';

interface EditCDPipelineStageProps {
    CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
}

export const useEditCDPipelineStage = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

    const CDPipelineStageEditMutation = useResourceCRUDMutation<
        EDPCDPipelineStageKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('CDPipelineStageEditMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.EDIT);

    const editCDPipelineStage = React.useCallback(
        async ({ CDPipelineStageData }: EditCDPipelineStageProps) => {
            CDPipelineStageEditMutation.mutate(CDPipelineStageData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [CDPipelineStageEditMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        CDPipelineStageEditMutation,
    };

    return { editCDPipelineStage, mutations };
};
