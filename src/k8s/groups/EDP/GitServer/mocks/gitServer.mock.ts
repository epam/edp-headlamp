import { DeepPartial } from 'react-hook-form';
import { GitServerKubeObjectInterface } from '../types';

export const gitServerGithubMock: DeepPartial<GitServerKubeObjectInterface> = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'GitServer',
  metadata: {
    name: 'github',
    namespace: 'test-namespace',
  },
  spec: {
    gitHost: 'github.com',
    gitProvider: 'github',
    gitUser: 'git',
    httpsPort: 111,
    nameSshKeySecret: 'ci-github',
    sshPort: 111,
  },
  status: {
    connected: true,
  },
};

export const gitServerGitlabMock: DeepPartial<GitServerKubeObjectInterface> = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'GitServer',
  metadata: {
    name: 'gitlab',
    namespace: 'test-namespace',
  },
  spec: {
    gitHost: 'gitlab.com',
    gitProvider: 'gitlab',
    gitUser: 'git',
    httpsPort: 111,
    nameSshKeySecret: 'ci-gitlab',
    sshPort: 111,
  },
  status: {
    connected: true,
  },
};

export const gitServerGerritMock: DeepPartial<GitServerKubeObjectInterface> = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'GitServer',
  metadata: {
    name: 'gitlab',
    namespace: 'test-namespace',
  },
  spec: {
    gitHost: 'gerrit.test-namespace',
    gitProvider: 'gerrit',
    gitUser: 'git',
    httpsPort: 111,
    nameSshKeySecret: 'gerrit-ciuser-sshkey',
    sshPort: 111,
  },
  status: {
    connected: true,
  },
};

export const gitServerBitbucketMock: DeepPartial<GitServerKubeObjectInterface> = {
  apiVersion: 'v2.edp.epam.com/v1',
  kind: 'GitServer',
  metadata: {
    name: 'bitbucket',
    namespace: 'test-namespace',
  },
  spec: {
    gitHost: 'bitbucket.org',
    gitProvider: 'bitbucket',
    gitUser: 'git',
    httpsPort: 111,
    nameSshKeySecret: 'ci-bitbucket',
    sshPort: 111,
  },
  status: {
    connected: true,
  },
};
