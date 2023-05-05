import { useCallback } from 'react';
import { createAutotestRunnerPipelineRunInstance } from '../../../../../../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { CRUD_TYPES } from '../../../../../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../../../../../hooks/useResourceCreationMutation';
import { PipelineRunKubeObject } from '../../../../../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../../../k8s/PipelineRun/types';
import { React } from '../../../../../../../../../../plugin.globals';

export interface CreateAutotestRunnerPipelineRunProps {
    namespace: string;
    stageName: string;
    CDPipelineName: string;
    storageSize: string;
    randomPostfix: string;
}

export const useCreateAutotestRunnerPipelineRun = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

    const autotestRunnerPipelineRunCreateMutation = useResourceCRUDMutation<
        PipelineRunKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('autotestRunnerPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE);

    const createAutotestRunnerPipelineRun = React.useCallback(
        async (data: CreateAutotestRunnerPipelineRunProps) => {
            const deployPipelineRunData = createAutotestRunnerPipelineRunInstance(data);
            autotestRunnerPipelineRunCreateMutation.mutate(deployPipelineRunData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [autotestRunnerPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        autotestRunnerPipelineRunCreateMutation,
    };

    return { createAutotestRunnerPipelineRun, mutations };
};
