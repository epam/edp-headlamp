import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useParams } from 'react-router-dom';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { CodebaseBranchKubeObject } from '../../../../k8s/groups/EDP/CodebaseBranch';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from '../../../../k8s/groups/EDP/CodebaseBranch/labels';
import { CodebaseBranchKubeObjectInterface } from '../../../../k8s/groups/EDP/CodebaseBranch/types';
import { useGitServerByNameQuery } from '../../../../k8s/groups/EDP/GitServer/hooks/useGitServerByCodebaseQuery';
import {
  generateBuildPipelineRef,
  generateReviewPipelineRef,
} from '../../../../k8s/groups/Tekton/PipelineRun/utils';
import { ComponentDetailsRouteParams } from '../../types';
import { isDefaultBranch } from '../../utils';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<ComponentDetailsRouteParams>();

  const [_component, componentError] = CodebaseKubeObject.useGet(name, namespace);

  const component = _component as
    | (CodebaseKubeObjectInterface & { jsonData: CodebaseKubeObjectInterface })
    | null
    | undefined;

  const {
    data: gitServerByCodebase,
    isLoading: gitServerByCodebaseIsLoading,
    error: gitServerByCodebaseError,
  } = useGitServerByNameQuery(component?.spec.gitServer);

  const [_codebaseBranches, codebaseBranchesError] = CodebaseBranchKubeObject.useList({
    namespace,
    labelSelector: `${CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME}=${name}`,
  });

  const codebaseBranches = _codebaseBranches as CodebaseBranchKubeObjectInterface[] | null;

  const sortedCodebaseBranches =
    !component || !codebaseBranches
      ? null
      : codebaseBranches.sort((a) => (isDefaultBranch(component, a) ? -1 : 1));

  const defaultBranch: CodebaseBranchKubeObjectInterface | undefined = sortedCodebaseBranches?.[0];

  const componentIsLoading = component === null && !componentError;
  const branchesIsLoading = codebaseBranches === null && !codebaseBranchesError;

  const DataContextValue = React.useMemo(
    () => ({
      component: {
        data: component && component.jsonData,
        error: componentError,
        isLoading: componentIsLoading,
      },
      pipelines: {
        data: {
          review:
            defaultBranch?.spec?.pipelines?.review ||
            generateReviewPipelineRef({
              gitServer: gitServerByCodebase!,
              component: component!,
            }),
          build:
            defaultBranch?.spec?.pipelines?.build ||
            generateBuildPipelineRef({
              gitServer: gitServerByCodebase!,
              component: component!,
            }),
        },
        error: (componentError || codebaseBranchesError || gitServerByCodebaseError) as ApiError,
        isLoading: componentIsLoading || branchesIsLoading || gitServerByCodebaseIsLoading,
      },
      codebaseBranches: {
        data: sortedCodebaseBranches,
        error: codebaseBranchesError,
        isLoading: branchesIsLoading,
      },
      gitServerByCodebase: {
        data: gitServerByCodebase,
        error: gitServerByCodebaseError as ApiError,
        isLoading: gitServerByCodebaseIsLoading,
      },
    }),
    [
      branchesIsLoading,
      codebaseBranchesError,
      component,
      componentError,
      componentIsLoading,
      defaultBranch?.spec?.pipelines?.build,
      defaultBranch?.spec?.pipelines?.review,
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
