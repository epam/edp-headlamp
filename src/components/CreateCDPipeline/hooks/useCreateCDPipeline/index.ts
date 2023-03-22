import { useCallback } from 'react';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../plugin.globals';

interface CreateCDPipelineProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
    CDPipelineStagesData: EDPCDPipelineStageKubeObjectInterface[];
}

export const useCreateCDPipeline = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

    const CDPipelineCreateMutation = useResourceCRUDMutation<
        EDPCDPipelineKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('CDPipelineCreateMutation', EDPCDPipelineKubeObject, CRUD_TYPES.CREATE);

    const CDPipelineDeleteMutation = useResourceCRUDMutation<
        EDPCDPipelineKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('CDPipelineDeleteMutation', EDPCDPipelineKubeObject, CRUD_TYPES.DELETE);

    const CDPipelineStageCreateMutation = useResourceCRUDMutation<
        EDPCDPipelineStageKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('CDPipelineStageCreateMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.CREATE);

    const CDPipelineStageDeleteMutation = useResourceCRUDMutation<
        EDPCDPipelineStageKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('CDPipelineStageDeleteMutation', EDPCDPipelineStageKubeObject, CRUD_TYPES.DELETE);

    const createCDPipeline = React.useCallback(
        async ({ CDPipelineData, CDPipelineStagesData }: CreateCDPipelineProps) => {
            CDPipelineCreateMutation.mutate(CDPipelineData, {
                onSuccess: async () => {
                    const createdStages: EDPCDPipelineStageKubeObjectInterface[] = [];

                    for await (const stage of CDPipelineStagesData) {
                        CDPipelineStageCreateMutation.mutate(stage, {
                            onSuccess: (data, { CDPipelineStageData }) => {
                                createdStages.push(CDPipelineStageData);

                                invokeOnSuccessCallback();
                            },
                            onError: async () => {
                                CDPipelineDeleteMutation.mutate(CDPipelineData);

                                for await (const createdStage of createdStages) {
                                    CDPipelineStageDeleteMutation.mutate(createdStage);
                                }

                                invokeOnErrorCallback();
                            },
                        });
                    }
                },
                onError: () => {
                    CDPipelineDeleteMutation.mutate(CDPipelineData);

                    invokeOnErrorCallback();
                },
            });
        },
        [
            CDPipelineCreateMutation,
            CDPipelineDeleteMutation,
            CDPipelineStageCreateMutation,
            CDPipelineStageDeleteMutation,
            invokeOnErrorCallback,
            invokeOnSuccessCallback,
        ]
    );

    const mutations = {
        CDPipelineCreateMutation,
        CDPipelineDeleteMutation,
        CDPipelineStageCreateMutation,
        CDPipelineStageDeleteMutation,
    };

    return { createCDPipeline, mutations };
};
