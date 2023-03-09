import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
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
}): {
    editCDPipelineStage: (props: EditCDPipelineStageProps) => Promise<void>;
    mutations: {
        CDPipelineStageEditMutation: UseMutationResult<
            EDPCDPipelineStageKubeObjectInterface,
            Error,
            { CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface }
        >;
    };
} => {
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const CDPipelineStageEditMutation = useMutation<
        EDPCDPipelineStageKubeObjectInterface,
        Error,
        {
            CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
        }
    >(
        'CDPipelineStageEditMutation',
        ({ CDPipelineStageData }) => {
            return EDPCDPipelineStageKubeObject.apiEndpoint.put(CDPipelineStageData);
        },
        {
            onMutate: ({ CDPipelineStageData }) =>
                showBeforeRequestMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.EDIT),
            onSuccess: (data, { CDPipelineStageData }) => {
                showRequestSuccessMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.EDIT);
            },
            onError: (error, { CDPipelineStageData }) => {
                showRequestErrorMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.EDIT);
            },
        }
    );

    const editCDPipelineStage = React.useCallback(
        async ({ CDPipelineStageData }: EditCDPipelineStageProps) => {
            CDPipelineStageEditMutation.mutate(
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
        [CDPipelineStageEditMutation, onError, onSuccess]
    );

    const mutations = {
        CDPipelineStageEditMutation,
    };

    return { editCDPipelineStage, mutations };
};
