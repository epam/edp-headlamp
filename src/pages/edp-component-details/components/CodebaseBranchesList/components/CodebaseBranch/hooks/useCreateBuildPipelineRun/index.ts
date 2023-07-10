import React, { useCallback } from 'react';
import { createBuildPipelineRunInstance } from '../../../../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { CRUD_TYPES } from '../../../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../../../hooks/useResourceCreationMutation';
import { PipelineRunKubeObject } from '../../../../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../../../../k8s/PipelineRun/types';

export interface CreateBuildPipelineRunProps {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseType: string;
        codebaseFramework: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
        codebaseGitUrlPath: string;
    };
    codebaseBranchData: {
        codebaseBranchMetadataName: string;
        codebaseBranchName: string;
    };
    gitServerData: {
        gitUser: string;
        gitHost: string;
        gitProvider: string;
        sshPort: number;
        nameSshKeySecret: string;
    };
    storageSize: string;
}

export const useCreateBuildPipelineRun = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}) => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);

    const buildPipelineRunCreateMutation = useResourceCRUDMutation<
        PipelineRunKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('buildPipelineRunCreateMutation', PipelineRunKubeObject, CRUD_TYPES.CREATE);

    const createBuildPipelineRun = React.useCallback(
        async (data: CreateBuildPipelineRunProps) => {
            const buildPipelineRunData = createBuildPipelineRunInstance(data);
            buildPipelineRunCreateMutation.mutate(buildPipelineRunData, {
                onSuccess: () => {
                    invokeOnSuccessCallback();
                },
                onError: () => {
                    invokeOnErrorCallback();
                },
            });
        },
        [buildPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        buildPipelineRunCreateMutation,
    };

    return { createBuildPipelineRun, mutations };
};
