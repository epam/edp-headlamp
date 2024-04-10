import { DeepPartial } from 'react-hook-form';
import { EDPGitServerKubeObjectInterface } from '../types';

export const gitServerGithubMock: DeepPartial<EDPGitServerKubeObjectInterface> = {
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

export const gitServerGitlabMock: DeepPartial<EDPGitServerKubeObjectInterface> = {
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

export const gitServerGerritMock: DeepPartial<EDPGitServerKubeObjectInterface> = {
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
