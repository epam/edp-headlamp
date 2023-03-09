import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../plugin.globals';

interface CreateCDPipelineStageProps {
    CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
}

export const useCreateCDPipelineStage = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createCDPipelineStage: (props: CreateCDPipelineStageProps) => Promise<void>;
    mutations: {
        CDPipelineStageCreateMutation: UseMutationResult<
            EDPCDPipelineStageKubeObjectInterface,
            Error,
            { CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface }
        >;
    };
} => {
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const CDPipelineStageCreateMutation = useMutation<
        EDPCDPipelineStageKubeObjectInterface,
        Error,
        {
            CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
        }
    >(
        'CDPipelineStageCreateMutation',
        ({ CDPipelineStageData }) => {
            return EDPCDPipelineStageKubeObject.apiEndpoint.post(CDPipelineStageData);
        },
        {
            onMutate: ({ CDPipelineStageData }) =>
                showBeforeRequestMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { CDPipelineStageData }) => {
                showRequestSuccessMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { CDPipelineStageData }) => {
                showRequestErrorMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const createCDPipelineStage = React.useCallback(
        async ({ CDPipelineStageData }: CreateCDPipelineStageProps) => {
            CDPipelineStageCreateMutation.mutate(
                { CDPipelineStageData },
                {
                    onSuccess: () => {
                        if (onSuccess) {
                            onSuccess();
                        }
                    },
                    onError: () => {
                        if (onError) {
                            onError();
                        }
                    },
                }
            );
        },
        [CDPipelineStageCreateMutation, onError, onSuccess]
    );

    const mutations = {
        CDPipelineStageCreateMutation,
    };

    return { createCDPipelineStage, mutations };
};
