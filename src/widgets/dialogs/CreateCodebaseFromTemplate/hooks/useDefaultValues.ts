import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../../constants/codebaseVersioningTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../../../constants/creationStrategies';
import { useGitServerListQuery } from '../../../../k8s/groups/EDP/GitServer/hooks/useGitServerListQuery';
import { TemplateKubeObjectInterface } from '../../../../k8s/groups/EDP/Template/types';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../names';

const defaultBranchName = 'main';
const defaultEDPVersioningValue = '0.1.0-SNAPSHOT';
const [defaultEDPVersioningVersion, defaultEDPVersioningVersionPostfix] =
  defaultEDPVersioningValue.split('-');

export const useDefaultValues = (template: TemplateKubeObjectInterface) => {
  const { data: gitServers } = useGitServerListQuery({});
  const firstValidGitServer = gitServers?.items.find((gitServer) => gitServer.status.connected);

  return React.useMemo(() => {
    return {
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.lang.name]: template?.spec.language,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.framework.name]: template?.spec.framework,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.buildTool.name]: template?.spec.buildTool,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.type.name]: template?.spec.type,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.repositoryUrl.name]: template?.spec.source,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.strategy.name]: CODEBASE_CREATION_STRATEGIES.CLONE,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.defaultBranch.name]: defaultBranchName,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name]: CODEBASE_VERSIONING_TYPES.EDP,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.emptyProject.name]: false,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.gitServer.name]: firstValidGitServer?.metadata.name || '',
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name]: defaultEDPVersioningValue,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name]:
        defaultEDPVersioningVersion,
      [CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name]:
        defaultEDPVersioningVersionPostfix,
    };
  }, [
    template?.spec.language,
    template?.spec.framework,
    template?.spec.buildTool,
    template?.spec.type,
    template?.spec.source,
    firstValidGitServer?.metadata.name,
  ]);
};
