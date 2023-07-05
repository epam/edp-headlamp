import React from 'react';
import { createDeployPipelineRunInstance } from '../../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { CRUD_TYPES } from '../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../hooks/useResourceCreationMutation';
import { PipelineRunKubeObject } from '../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../k8s/PipelineRun/types';

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
}) => {
    const invokeOnSuccessCallback = React.useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = React.useCallback(() => onError && onError(), [onError]);

    const deployPipelineRunCreateMutation = useResourceCRUDMutation<
        PipelineRunKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('deployPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE);

    const createDeployPipelineRun = React.useCallback(
        async (data: CreateDeployPipelineRunProps) => {
            const deployPipelineRunData = createDeployPipelineRunInstance(data);
            deployPipelineRunCreateMutation.mutate(deployPipelineRunData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [deployPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        deployPipelineRunCreateMutation,
    };

    return { createDeployPipelineRun, mutations };
};
