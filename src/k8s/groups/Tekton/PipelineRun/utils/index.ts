import { CodebaseKubeObjectInterface } from '../../../EDP/Codebase/types';
import { GitServerKubeObjectInterface } from '../../../EDP/GitServer/types';

export const generateBuildPipelineRef = ({
  gitServer,
  component,
}: {
  gitServer: GitServerKubeObjectInterface;
  component: CodebaseKubeObjectInterface;
}) => {
  if (!gitServer || !component) {
    return '';
  }

  const gitProvider = gitServer.spec.gitProvider;
  const codebaseBuildTool = component.spec.buildTool;
  const codebaseFramework = component.spec.framework;
  const codebaseType = component.spec.type;
  const codebaseVersioningType = component.spec.versioning.type;

  const truncatedCodebaseType = codebaseType.slice(0, 3);

  return `${gitProvider}-${codebaseBuildTool}-${codebaseFramework}-${truncatedCodebaseType}-build-${codebaseVersioningType}`;
};

export const generateReviewPipelineRef = ({
  gitServer,
  component,
}: {
  gitServer: GitServerKubeObjectInterface;
  component: CodebaseKubeObjectInterface;
}) => {
  if (!gitServer || !component) {
    return '';
  }

  const gitProvider = gitServer.spec.gitProvider;
  const codebaseBuildTool = component.spec.buildTool;
  const codebaseFramework = component.spec.framework;
  const codebaseType = component.spec.type;
  const truncatedCodebaseType = codebaseType.slice(0, 3);

  return `${gitProvider}-${codebaseBuildTool}-${codebaseFramework}-${truncatedCodebaseType}-review`;
};
