import React from 'react';
import { useParams } from 'react-router-dom';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { useGitServerByCodebaseQuery } from '../../../../k8s/groups/EDP/GitServer/hooks/useGitServerByCodebaseQuery';
import {
  generateBuildPipelineRef,
  generateReviewPipelineRef,
} from '../../../../k8s/groups/Tekton/PipelineRun/utils';
import { ComponentDetailsRouteParams } from '../../types';
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
    }),
    [buildPipelineRefName, component, error, reviewPipelineRefName]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
