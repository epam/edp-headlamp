import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import { createRandomString } from '../../../../../../utils/createRandomString';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../EDP/CodebaseBranch/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE,
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../labels';
import { PipelineRunKubeObjectInterface } from '../../types';

export const createBuildPipelineRunInstance = ({
  codebase,
  codebaseBranch,
  pipelineRunTemplate,
  gitServer,
}: {
  codebase: CodebaseKubeObjectInterface;
  codebaseBranch: CodebaseBranchKubeObjectInterface;
  pipelineRunTemplate: PipelineRunKubeObjectInterface;
  gitServer: GitServerKubeObjectInterface;
}): PipelineRunKubeObjectInterface => {
  const {
    metadata: { name: codebaseName },
    spec: { gitUrlPath: codebaseGitUrlPath, buildTool: codebaseBuildTool },
  } = codebase;

  const {
    metadata: { name: codebaseBranchMetadataName },
    spec: { branchName: codebaseBranchName },
  } = codebaseBranch;

  const {
    spec: { gitUser, gitHost, sshPort },
  } = gitServer;

  const base = { ...pipelineRunTemplate };

  const generateName = base.metadata.generateName.replace(
    '$(tt.params.codebasebranch)',
    codebaseBranchMetadataName
  );

  delete base.metadata.generateName;

  base.metadata.name = `${generateName}${createRandomString(4)}`;

  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_CODEBASE] = codebaseName;
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH] = codebaseBranchMetadataName;
  base.metadata.labels[PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE] = PIPELINE_TYPES.BUILD;

  base.spec.pipelineRef.name = codebaseBranch.spec.pipelines.build;

  base.spec.workspaces = [
    ...base.spec.workspaces,
    {
      name: 'settings',
      configMap: {
        name: `custom-${codebaseBuildTool}-settings`,
      },
    },
  ];

  for (const param of base.spec.params) {
    switch (param.name) {
      case 'git-source-url':
        param.value = `ssh://${gitUser}@${gitHost}:${sshPort}${codebaseGitUrlPath}`;
        break;
      case 'git-source-revision':
        param.value = codebaseBranchName;
        break;
      case 'CODEBASE_NAME':
        param.value = codebaseName;
        break;
      case 'CODEBASEBRANCH_NAME':
        param.value = codebaseBranchMetadataName;
        break;
      case 'changeNumber':
        param.value = '1';
        break;
      case 'patchsetNumber':
        param.value = '1';
        break;
      case 'TICKET_NAME_PATTERN':
        param.value = codebase.spec.ticketNamePattern ?? '';
        break;
      case 'COMMIT_MESSAGE_PATTERN':
        param.value = codebase.spec.commitMessagePattern ?? '';
        break;
      case 'JIRA_ISSUE_METADATA_PAYLOAD':
        param.value = codebase.spec.jiraIssueMetadataPayload ?? '';
        break;
      case 'COMMIT_MESSAGE':
        param.value = '';
        break;
      case 'JIRA_SERVER':
        param.value = codebase.spec.jiraServer ?? '';
        break;
      default:
        break;
    }
  }

  return base;
};
