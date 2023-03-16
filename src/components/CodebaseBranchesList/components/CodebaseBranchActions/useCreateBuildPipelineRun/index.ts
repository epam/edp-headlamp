import { useCallback } from 'react';
import { useMutation, UseMutationResult } from 'react-query';
import { createBuildPipelineRunInstance } from '../../../../../configs/k8s-resource-instances/custom-resources/pipeline-run';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../../hooks/useResourceRequestStatusMessages';
import { PipelineRunKubeObject } from '../../../../../k8s/PipelineRun';
import { PipelineRunKubeObjectInterface } from '../../../../../k8s/PipelineRun/types';
import { React } from '../../../../../plugin.globals';

export interface CreateBuildPipelineRunProps {
    namespace: string;
    codebaseData: {
        codebaseName: string;
        codebaseType: string;
        codebaseFramework: string;
        codebaseBuildTool: string;
        codebaseVersioningType: string;
        codebaseStrategy: string;
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
    randomPostfix: string;
}

export const useCreateBuildPipelineRun = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createBuildPipelineRun: (props: CreateBuildPipelineRunProps) => Promise<void>;
    mutations: {
        buildPipelineRunCreateMutation: UseMutationResult<
            PipelineRunKubeObjectInterface,
            Error,
            { buildPipelineRunData: PipelineRunKubeObjectInterface }
        >;
    };
} => {
    const invokeOnSuccessCallback = useCallback(() => onSuccess && onSuccess(), [onSuccess]);
    const invokeOnErrorCallback = useCallback(() => onError && onError(), [onError]);
    const {
        showBeforeRequestMessage,
        showRequestErrorMessage,
        showRequestSuccessMessage,
        showRequestErrorDetailedMessage,
    } = useRequestStatusMessages();

    const buildPipelineRunCreateMutation = useMutation<
        PipelineRunKubeObjectInterface,
        Error,
        {
            buildPipelineRunData: PipelineRunKubeObjectInterface;
        }
    >(
        'buildPipelineRunCreateMutation',
        ({ buildPipelineRunData }) => {
            return PipelineRunKubeObject.apiEndpoint.post(buildPipelineRunData);
        },
        {
            onMutate: ({ buildPipelineRunData }) =>
                showBeforeRequestMessage(buildPipelineRunData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { buildPipelineRunData }) => {
                showRequestSuccessMessage(buildPipelineRunData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { buildPipelineRunData }) => {
                showRequestErrorMessage(buildPipelineRunData.metadata.name, CRUD_TYPES.CREATE);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );

    const createBuildPipelineRun = React.useCallback(
        async (data: CreateBuildPipelineRunProps) => {
            const buildPipelineRunData = createBuildPipelineRunInstance(data);
            buildPipelineRunCreateMutation.mutate(
                { buildPipelineRunData },
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
        [buildPipelineRunCreateMutation, invokeOnErrorCallback, invokeOnSuccessCallback]
    );

    const mutations = {
        buildPipelineRunCreateMutation,
    };

    return { createBuildPipelineRun, mutations };
};
