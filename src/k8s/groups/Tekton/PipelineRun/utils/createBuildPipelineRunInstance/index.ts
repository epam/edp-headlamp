import { GIT_PROVIDERS } from '../../../../../../constants/gitProviders';
import { PIPELINE_TYPES } from '../../../../../../constants/pipelineTypes';
import { createRandomString } from '../../../../../../utils/createRandomString';
import { CodebaseKubeObjectInterface } from '../../../../EDP/Codebase/types';
import { CodebaseBranchKubeObjectInterface } from '../../../../EDP/CodebaseBranch/types';
import { GitServerKubeObjectInterface } from '../../../../EDP/GitServer/types';
import { PipelineRunKubeObjectConfig } from '../../config';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE,
  PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../labels';
import { PipelineRunKubeObjectInterface } from '../../types';

const { kind, group, version } = PipelineRunKubeObjectConfig;

export const createBuildPipelineRunInstance = ({
  namespace,
  codebase,
  codebaseBranch,
  gitServer,
  storageSize,
}: {
  namespace: string;
  codebase: CodebaseKubeObjectInterface;
  codebaseBranch: CodebaseBranchKubeObjectInterface;
  gitServer: GitServerKubeObjectInterface;
  storageSize: string;
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
    spec: { gitUser, gitHost, gitProvider, sshPort, nameSshKeySecret },
  } = gitServer;

  const normalizedCodebaseBranchName = codebaseBranchName.replaceAll('/', '-').replaceAll('.', '-');
  const trimmedPipelineRunNameStartValue = `${codebaseName}-${normalizedCodebaseBranchName}`.slice(
    0,
    33
  ); // 33 max length for name before random postfix

  const base: any = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      namespace,
      name: `${trimmedPipelineRunNameStartValue}-build-${createRandomString(4)}`,
      labels: {
        [PIPELINE_RUN_LABEL_SELECTOR_CODEBASE_BRANCH]: codebaseBranchMetadataName,
        [PIPELINE_RUN_LABEL_SELECTOR_CODEBASE]: codebaseName,
        [PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE]: PIPELINE_TYPES.BUILD,
      },
      annotations: {
        'argocd.argoproj.io/compare-options': 'IgnoreExtraneous',
      },
    },
    spec: {
      params: [
        {
          name: 'git-source-url',
          value: `ssh://${gitUser}@${gitHost}:${sshPort}${codebaseGitUrlPath}`,
        },
        {
          name: 'git-source-revision',
          value: codebaseBranchName,
        },
        {
          name: 'CODEBASEBRANCH_NAME',
          value: codebaseBranchMetadataName,
        },
        {
          name: 'CODEBASE_NAME',
          value: codebaseName,
        },
      ],
      pipelineRef: {
        name: codebaseBranch.spec.pipelines.build,
      },
      taskRunTemplate: {
        serviceAccountName: 'tekton',
      },
      timeouts: {
        pipeline: '1h0m0s',
      },
      workspaces: [
        {
          name: 'settings',
          configMap: {
            name: `custom-${codebaseBuildTool}-settings`,
          },
        },
        {
          name: 'shared-workspace',
          subPath: 'codebase',
          volumeClaimTemplate: {
            metadata: {
              creationTimestamp: null,
            },
            spec: {
              accessModes: ['ReadWriteOnce'],
              resources: {
                requests: {
                  storage: storageSize,
                },
              },
            },
            status: {},
          },
        },
        {
          name: 'ssh-creds',
          secret: {
            secretName: nameSshKeySecret,
          },
        },
      ],
    },
  };

  if (gitProvider === GIT_PROVIDERS['GERRIT']) {
    base.spec.params.push({
      name: 'changeNumber',
      value: '1',
    });
    base.spec.params.push({
      name: 'patchsetNumber',
      value: '1',
    });
  }

  return base;
};
