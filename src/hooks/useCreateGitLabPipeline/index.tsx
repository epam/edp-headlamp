import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { Snackbar } from '../../components/Snackbar';
import { useEDPConfigMapQuery } from '../../k8s/groups/default/ConfigMap/hooks/useEDPConfigMap';
import { ApiServiceBase, GitFusionApiService } from '../../services/api';
import { getToken } from '../../utils/getToken';
import { GitLabPipelineResponse, GitLabPipelineTriggerData } from './types';

export const useCreateGitLabPipeline = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (response: GitLabPipelineResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const cluster = Utils.getCluster() || '';
  const token = getToken(cluster);
  const { data: EDPConfigMap } = useEDPConfigMapQuery();
  const apiGatewayUrl = EDPConfigMap?.data?.api_gateway_url;
  const { enqueueSnackbar } = useSnackbar();

  const invokeOnSuccessCallback = useCallback(
    (response: GitLabPipelineResponse) => onSuccess && onSuccess(response),
    [onSuccess]
  );
  const invokeOnErrorCallback = useCallback(
    (error: Error) => onError && onError(error),
    [onError]
  );

  const mutation = useMutation<GitLabPipelineResponse, Error, GitLabPipelineTriggerData>(
    async (data: GitLabPipelineTriggerData) => {
      if (!apiGatewayUrl) {
        throw new Error('API Gateway URL is not configured');
      }

      const apiServiceBase = new ApiServiceBase(apiGatewayUrl, token);
      const gitFusionApiService = new GitFusionApiService(apiServiceBase);

      // Strip leading slash from gitUrlPath
      const project = data.gitUrlPath.startsWith('/')
        ? data.gitUrlPath.slice(1)
        : data.gitUrlPath;

      const endpoint = gitFusionApiService.getTriggerGitLabPipelineEndpoint(
        data.gitServer,
        project,
        data.branchName,
        data.variables
      );

      // Use POST method for triggering pipeline
      const response = await apiServiceBase.createFetcher(endpoint, undefined, 'POST');

      return response;
    },
    {
      onSuccess: (response) => {
        enqueueSnackbar('GitLab pipeline triggered successfully!', {
          variant: 'success',
          autoHideDuration: 8000,
          content: (key, message) => (
            <Snackbar
              text={String(message)}
              snackbarKey={key}
              externalLink={
                response.web_url
                  ? {
                      url: response.web_url,
                      text: 'View Pipeline',
                    }
                  : undefined
              }
              variant={'success'}
            />
          ),
        });
        invokeOnSuccessCallback(response);
      },
      onError: (error) => {
        enqueueSnackbar(`Failed to trigger GitLab pipeline: ${error.message}`, {
          variant: 'error',
          autoHideDuration: 8000,
        });
        invokeOnErrorCallback(error);
      },
    }
  );

  const createGitLabPipeline = React.useCallback(
    (data: GitLabPipelineTriggerData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return {
    createGitLabPipeline,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};
