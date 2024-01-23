import { safeEncode } from '../../../../utils/decodeEncode';
import { SECRET_LABEL_SECRET_TYPE } from '../../labels';
import { SecretKubeObjectInterface } from '../../types';

export const createGerritGitServerSecretInstance = ({
  sshPrivateKey,
  sshPublicKey,
  username,
}: {
  sshPrivateKey: string;
  sshPublicKey: string;
  username: string;
}): SecretKubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'repository',
      },
      name: 'gerrit-ciuser-sshkey',
    },
    data: {
      id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
      'id_rsa.pub': safeEncode(sshPublicKey),
      username: safeEncode(username),
    },
  };
};

export const createGithubGitServerSecretInstance = ({
  sshPrivateKey,
  token,
  username,
}: {
  sshPrivateKey: string;
  token: string;
  username: string;
}): SecretKubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'repository',
      },
      name: 'ci-github',
    },
    data: {
      id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
      token: safeEncode(token),
      username: safeEncode(username),
    },
  };
};

export const createGitlabGitServerSecretInstance = ({
  sshPrivateKey,
  token,
}: {
  sshPrivateKey: string;
  token: string;
}): SecretKubeObjectInterface => {
  return {
    apiVersion: 'v1',
    kind: 'Secret',
    // @ts-ignore
    metadata: {
      labels: {
        [SECRET_LABEL_SECRET_TYPE]: 'repository',
      },
      name: 'ci-gitlab',
    },
    data: {
      id_rsa: safeEncode(sshPrivateKey.trim() + '\n'),
      token: safeEncode(token),
    },
  };
};
