import React from 'react';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../hooks/useResourceCRUDMutation';
import { CDPipelineKubeObjectInterface } from '../../../EDP/CDPipeline/types';
import { CodebaseKubeObjectInterface } from '../../../EDP/Codebase/types';
import { CodebaseImageStreamKubeObjectInterface } from '../../../EDP/CodebaseImageStream/types';
import { GitServerKubeObjectInterface } from '../../../EDP/GitServer/types';
import { StageKubeObjectInterface } from '../../../EDP/Stage/types';
import { ApplicationKubeObject } from '../index';
import { ApplicationKubeObjectInterface } from '../types';
import { createArgoApplicationInstance } from '../utils/createArgoApplicationInstance';
import { editApplicationInstance } from '../utils/editApplicationInstance';

interface CreateArgoApplicationProps {
  gitServers: GitServerKubeObjectInterface[];
  CDPipeline: CDPipelineKubeObjectInterface;
  currentCDPipelineStage: StageKubeObjectInterface;
  application: CodebaseKubeObjectInterface;
  imageStream: CodebaseImageStreamKubeObjectInterface;
  imageTag: string;
  valuesOverride: boolean;
  gitOpsCodebase: CodebaseKubeObjectInterface;
}

interface EditArgoApplicationProps {
  argoApplication: ApplicationKubeObjectInterface;
  gitServers: GitServerKubeObjectInterface[];
  CDPipeline: CDPipelineKubeObjectInterface;
  currentCDPipelineStage: StageKubeObjectInterface;
  application: CodebaseKubeObjectInterface;
  imageStream: CodebaseImageStreamKubeObjectInterface;
  imageTag: string;
  valuesOverride: boolean;
  gitOpsCodebase: CodebaseKubeObjectInterface;
}

interface DeleteArgoApplicationProps {
  argoApplication: ApplicationKubeObjectInterface;
}

export const useCreateArgoApplication = () => {
  const argoApplicationCreateMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    CRUD_TYPES.CREATE
  >('argoApplicationCreateMutation', ApplicationKubeObject, CRUD_TYPES.CREATE, {
    customMessages: {
      onMutate: 'Creating application...',
      onError: 'Failed to deploy application',
      onSuccess: 'Start deploying application',
    },
  });

  const argoApplicationEditMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    CRUD_TYPES.EDIT
  >('argoApplicationEditMutation', ApplicationKubeObject, CRUD_TYPES.EDIT, {
    customMessages: {
      onMutate: 'Applying changes...',
      onError: 'Failed to update application',
      onSuccess: 'Start updating application',
    },
  });

  const argoApplicationDeleteMutation = useResourceCRUDMutation<
    ApplicationKubeObjectInterface,
    CRUD_TYPES.DELETE
  >('argoApplicationDeleteMutation', ApplicationKubeObject, CRUD_TYPES.DELETE, {
    customMessages: {
      onMutate: 'Uninstalling application...',
      onError: 'Failed to uninstall application',
      onSuccess: 'Start uninstalling application',
    },
  });

  const createArgoApplication = React.useCallback(
    async ({
      gitServers,
      CDPipeline,
      currentCDPipelineStage,
      application,
      imageStream,
      imageTag,
      valuesOverride,
      gitOpsCodebase,
    }: CreateArgoApplicationProps): Promise<void> => {
      const [gitServer] = gitServers.filter(
        (el) => el.metadata.name === application.spec.gitServer
      );

      const argoApplicationData = createArgoApplicationInstance({
        CDPipeline,
        currentCDPipelineStage,
        application,
        imageStream,
        imageTag,
        gitServer,
        valuesOverride,
        gitOpsCodebase,
      });

      argoApplicationCreateMutation.mutate(argoApplicationData);
    },
    [argoApplicationCreateMutation]
  );

  const editArgoApplication = React.useCallback(
    async ({
      CDPipeline,
      currentCDPipelineStage,
      argoApplication,
      application,
      imageStream,
      imageTag,
      gitServers,
      valuesOverride,
      gitOpsCodebase,
    }: EditArgoApplicationProps): Promise<void> => {
      const [gitServer] = gitServers.filter(
        (el) => el.metadata.name === application.spec.gitServer
      );

      const argoApplicationData: ApplicationKubeObjectInterface = editApplicationInstance({
        CDPipeline,
        currentCDPipelineStage,
        argoApplication,
        application,
        imageStream,
        imageTag,
        gitServer,
        valuesOverride,
        gitOpsCodebase,
      });

      argoApplicationEditMutation.mutate(argoApplicationData);
    },
    [argoApplicationEditMutation]
  );

  const deleteArgoApplication = React.useCallback(
    async ({ argoApplication }: DeleteArgoApplicationProps): Promise<void> => {
      argoApplicationDeleteMutation.mutate(argoApplication);
    },
    [argoApplicationDeleteMutation]
  );

  const mutations = {
    argoApplicationCreateMutation,
    argoApplicationEditMutation,
    argoApplicationDeleteMutation,
  };

  return { createArgoApplication, editArgoApplication, deleteArgoApplication, mutations };
};
