import React from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';
import { createDeployPipelineRunInstance } from '../utils/createDeployPipelineRunInstance';

export interface CreateDeployPipelineRunProps {
    namespace: string;
    pipelineName: string;
    stageName: string;
    CDPipelineName: string;
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
