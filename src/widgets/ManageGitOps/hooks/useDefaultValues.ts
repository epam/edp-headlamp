import React from 'react';
import { CI_TOOL } from '../../../constants/ciTools';
import { CODEBASE_TYPE } from '../../../constants/codebaseTypes';
import { CODEBASE_VERSIONING_TYPE } from '../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGY } from '../../../constants/creationStrategies';
import { DEPLOYMENT_SCRIPT } from '../../../constants/deploymentScripts';
import { useGitServerListQuery } from '../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { GIT_OPS_CODEBASE_NAME } from '../constants';
import { CODEBASE_FORM_NAMES } from '../names';
import { ManageGitOpsDataContext } from '../types';

export const useDefaultValues = ({ formData }: { formData: ManageGitOpsDataContext }) => {
  const { currentElement } = formData;

  const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

  const { data: gitServers } = useGitServerListQuery();
  const firstValidGitServer = gitServers?.items.find((gitServer) => gitServer?.status?.connected);

  return React.useMemo(() => {
    if (isPlaceholder) {
      return {
        [CODEBASE_FORM_NAMES.emptyProject.name]: false,
        [CODEBASE_FORM_NAMES.name.name]: GIT_OPS_CODEBASE_NAME,
        [CODEBASE_FORM_NAMES.gitUrlPath.name]: `/${GIT_OPS_CODEBASE_NAME}`,
        [CODEBASE_FORM_NAMES.lang.name]: 'helm',
        [CODEBASE_FORM_NAMES.framework.name]: 'gitops',
        [CODEBASE_FORM_NAMES.buildTool.name]: 'helm',
        [CODEBASE_FORM_NAMES.ciTool.name]: CI_TOOL.TEKTON,
        [CODEBASE_FORM_NAMES.gitServer.name]: firstValidGitServer?.metadata.name || '',
        [CODEBASE_FORM_NAMES.defaultBranch.name]: 'main',
        [CODEBASE_FORM_NAMES.deploymentScript.name]: DEPLOYMENT_SCRIPT.HELM_CHART,
        [CODEBASE_FORM_NAMES.description.name]: 'Custom values for deploy applications',
        [CODEBASE_FORM_NAMES.strategy.name]: CODEBASE_CREATION_STRATEGY.CREATE,
        [CODEBASE_FORM_NAMES.type.name]: CODEBASE_TYPE.SYSTEM,
        [CODEBASE_FORM_NAMES.versioningType.name]: CODEBASE_VERSIONING_TYPE.SEMVER,
        [CODEBASE_FORM_NAMES.versioningStartFrom.name]: '0.1.0-SNAPSHOT',
        [CODEBASE_FORM_NAMES.systemTypeLabel.name]: 'gitops',
      };
    }

    const gitUrlPath = currentElement?.spec.gitUrlPath || '';
    const gitUrlPathWithNoSlashAtTheStart = gitUrlPath.replace('/', '');
    const gitRepoPath = gitUrlPathWithNoSlashAtTheStart.split('/').slice(0, -1).join('/');

    // const gitRepoPath = currentElement?.spec.gitUrlPath
    //   .replace(`/${GIT_OPS_CODEBASE_NAME}`, '')
    //   .replace('/', '');

    return {
      [CODEBASE_FORM_NAMES.gitServer.name]: currentElement?.spec.gitServer,
      [CODEBASE_FORM_NAMES.gitRepoPath.name]: gitRepoPath,
      [CODEBASE_FORM_NAMES.name.name]: currentElement?.metadata.name,
    };
  }, [currentElement, firstValidGitServer?.metadata.name, isPlaceholder]);
};
