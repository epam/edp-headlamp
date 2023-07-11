import React, { useCallback } from 'react';
import { CRUD_TYPES } from '../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../hooks/useResourceCRUDMutation';
import { PipelineRunKubeObject } from '../index';
import { PipelineRunKubeObjectInterface } from '../types';
import { createBuildPipelineRunInstance } from '../utils/createBuildPipelineRunInstance';

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
