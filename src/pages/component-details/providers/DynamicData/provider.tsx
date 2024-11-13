import React from 'react';
import { useParams } from 'react-router-dom';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseBranchKubeObject } from '../../../../k8s/groups/EDP/CodebaseBranch';
import { CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME } from '../../../../k8s/groups/EDP/CodebaseBranch/labels';
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

  const { data: gitServerByCodebase } = useGitServerByCodebaseQuery({
    props: { codebaseGitServer: component?.spec.gitServer },
  });

  const reviewPipelineRefName = generateReviewPipelineRef({
    gitServer: gitServerByCodebase,
    component: component,
  });

  const buildPipelineRefName = generateBuildPipelineRef({
    gitServer: gitServerByCodebase,
    component: component,
  });

  const [codebaseBranches, codebaseBranchesError] = CodebaseBranchKubeObject.useList({
    namespace,
    labelSelector: `${CODEBASE_BRANCH_LABEL_SELECTOR_CODEBASE_NAME}=${name}`,
  });

  const sortedCodebaseBranches = codebaseBranches?.sort((a) =>
    isDefaultBranch(component, a) ? -1 : 1
  );

  const DataContextValue = React.useMemo(
    () => ({
      component: {
        data: component?.jsonData,
        error: error,
        isLoading: component === null,
      },
      pipelines: {
        data: {
          review: reviewPipelineRefName,
          build: buildPipelineRefName,
        },
        error: error,
        isLoading: component === null,
      },
      codebaseBranches: {
        data: sortedCodebaseBranches,
        error: codebaseBranchesError,
        isLoading: codebaseBranches === null,
      },
    }),
    [
      buildPipelineRefName,
      codebaseBranches,
      codebaseBranchesError,
      component,
      error,
      reviewPipelineRefName,
      sortedCodebaseBranches,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
