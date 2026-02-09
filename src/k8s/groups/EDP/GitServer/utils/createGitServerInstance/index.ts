import { set } from 'lodash';
import { GIT_PROVIDER, GitProvider } from '../../../../../../constants/gitProviders';
import { FormNameObject } from '../../../../../../types/forms';
import { DeepPartial } from '../../../../../../types/global';
import { GitServerKubeObjectConfig } from '../../config';
import { GitServerKubeObjectInterface } from '../../types';

const { kind, group, version } = GitServerKubeObjectConfig;

export const createGitServerSecretName = (gitProvider: GitProvider): string => {
  return gitProvider === GIT_PROVIDER.GERRIT ? 'gerrit-ciuser-sshkey' : `ci-${gitProvider}`;
};

export const createGitServerInstance = (
  names: {
    [key: string]: FormNameObject;
  },
  formValues: {
    [key: string]: any;
  }
): GitServerKubeObjectInterface => {
  const { gitHost, name, ...restProps } = formValues;
  const nameSshKeySecret =
    formValues.gitProvider === GIT_PROVIDER.GERRIT
      ? 'gerrit-ciuser-sshkey'
      : `ci-${formValues.gitProvider}`;

  const base: DeepPartial<GitServerKubeObjectInterface> = {
    apiVersion: `${group}/${version}`,
    kind,
    metadata: {
      name,
    },
    spec: {
      gitHost,
      nameSshKeySecret,
    },
  };

  for (const [propKey, propValue] of Object.entries(restProps)) {
    const propPath = names[propKey].path;
    if (!propPath) {
      continue;
    }
    set(base, propPath, propValue);
  }

  return base as GitServerKubeObjectInterface;
};
