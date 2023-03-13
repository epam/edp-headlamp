import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { createDeployPipelineRunInstance } from '../../../../../../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { CRUD_TYPES } from '../../../../../../../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../../../../../../../hooks/useResourceRequestStatusMessages';
import { PipelineRunKubeObject } from '../../../../../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../../../k8s/PipelineRun/types';
import { React } from '../../../../../../../../../../plugin.globals';

export interface CreateDeployPipelineRunProps {
    namespace: string;
    pipelineName: string;
    stageName: string;
    CDPipelineName: string;
    randomPostfix: string;
    codebaseTag: string;
}

export const useCreateDeployPipelineRun = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createDeployPipelineRun: (props: CreateDeployPipelineRunProps) => Promise<void>;
    mutations: {
        deployPipelineRunCreateMutation: UseMutationResult<
            PipelineRunKubeObjectInterface,
            Error,
            { deployPipelineRunData: PipelineRunKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const deployPipelineRunCreateMutation = useMutation<
        PipelineRunKubeObjectInterface,
        Error,
        {
            deployPipelineRunData: PipelineRunKubeObjectInterface;
        }
    >(
        'deployPipelineRunCreateMutation',
        ({ deployPipelineRunData }) => {
            return PipelineRunKubeObject.apiEndpoint.post(deployPipelineRunData);
        },
        {
            onMutate: ({ deployPipelineRunData }) =>
                showBeforeRequestMessage(deployPipelineRunData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { deployPipelineRunData }) => {
                showRequestSuccessMessage(deployPipelineRunData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { deployPipelineRunData }) => {
                showRequestErrorMessage(deployPipelineRunData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const createDeployPipelineRun = React.useCallback(
        async (data: CreateDeployPipelineRunProps) => {
            const deployPipelineRunData = createDeployPipelineRunInstance(data);
            deployPipelineRunCreateMutation.mutate(
                { deployPipelineRunData },
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
        [deployPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        deployPipelineRunCreateMutation,
    };

    return { createDeployPipelineRun, mutations };
};
