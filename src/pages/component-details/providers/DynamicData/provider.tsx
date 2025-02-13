import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseBranchKubeObject } from '../../../../k8s/groups/EDP/CodebaseBranch';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from '../../../../k8s/groups/EDP/CodebaseBranch/labels';
import { CodebaseBranchKubeObjectInterface } from '../../../../k8s/groups/EDP/CodebaseBranch/types';
import { useGitServerByCodebaseQuery } from '../../../../k8s/groups/EDP/GitServer/hooks/useGitServerByCodebaseQuery';
import {
  generateBuildPipelineRef,
  generateReviewPipelineRef,
} from '../../../../k8s/groups/Tekton/PipelineRun/utils';
import { ComponentDetailsRouteParams } from '../../types';
import { isDefaultBranch } from '../../utils';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<ComponentDetailsRouteParams>();

  const [component, error] = CodebaseKubeObject.useGet(name, namespace);

  const {
    data: gitServerByCodebase,
    isLoading: gitServerByCodebaseIsLoading,
    error: gitServerByCodebaseError,
  } = useGitServerByCodebaseQuery({
    props: { codebaseGitServer: component?.spec.gitServer },
  });

  const [codebaseBranches, codebaseBranchesError] = CodebaseBranchKubeObject.useList({
    namespace,
    labelSelector: `${CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME}=${name}`,
  });

  const sortedCodebaseBranches =
    component === null
      ? null
      : codebaseBranches?.sort((a) => (isDefaultBranch(component, a) ? -1 : 1));

  const defaultBranch: CodebaseBranchKubeObjectInterface = sortedCodebaseBranches?.[0];

  const DataContextValue = React.useMemo(
    () => ({
      component: {
        data: component?.jsonData,
        error: error,
        isLoading: component === null,
      },
      pipelines: {
        data: {
          review:
            defaultBranch?.spec?.pipelines?.review ||
            generateReviewPipelineRef({
              gitServer: gitServerByCodebase,
              component: component,
            }),
          build:
            defaultBranch?.spec?.pipelines?.build ||
            generateBuildPipelineRef({
              gitServer: gitServerByCodebase,
              component: component,
            }),
        },
        error: error,
        isLoading: component === null || codebaseBranches === null,
      },
      codebaseBranches: {
        data: sortedCodebaseBranches,
        error: codebaseBranchesError,
        isLoading: codebaseBranches === null,
      },
      gitServerByCodebase: {
        data: gitServerByCodebase,
        error: gitServerByCodebaseError as ApiError,
        isLoading: gitServerByCodebaseIsLoading,
      },
    }),
    [
      codebaseBranches,
      codebaseBranchesError,
      component,
      defaultBranch?.spec?.pipelines?.build,
      defaultBranch?.spec?.pipelines?.review,
      error,
      gitServerByCodebase,
      gitServerByCodebaseError,
      gitServerByCodebaseIsLoading,
      sortedCodebaseBranches,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
