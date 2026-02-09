import { GIT_PROVIDER, GitProvider } from '../../../constants/gitProviders';
import { createURLObjectFromURLOrigin } from '../index';

export const GitURLService = {
  createGitOpsValuesYamlFileLink: (
    gitOpsWebUrl: string,
    pipelineName: string,
    stageName: string,
    appName: string,
    gitServer: GitProvider
  ) => {
    if (!gitOpsWebUrl) {
      return undefined;
    }

    const gitHostURLObject = createURLObjectFromURLOrigin(gitOpsWebUrl);

    if (gitServer === GIT_PROVIDER.GERRIT) {
      gitHostURLObject.searchParams.append(
        'f',
        `${pipelineName}/${stageName}/${appName}-values.yaml`
      );
      gitHostURLObject.searchParams.append('hb', 'refs/heads/main');
      gitHostURLObject.searchParams.append('a', 'blob');

      return gitHostURLObject.href;
    } else if (gitServer === GIT_PROVIDER.GITHUB || gitServer === GIT_PROVIDER.GITLAB) {
      return `${gitHostURLObject.href}/blob/main/${pipelineName}/${stageName}/${appName}-values.yaml`;
    } else if (gitServer === GIT_PROVIDER.BITBUCKET) {
      return `${gitHostURLObject.href}/src/main/${pipelineName}/${stageName}/${appName}-values.yaml`;
    }
  },
  createRepoBranchLink: (gitServer: GitProvider, baseUrl: string | undefined, branch: string) => {
    if (!gitServer || !baseUrl) {
      return baseUrl;
    }

    const updatedUrl = new URL(baseUrl);

    switch (gitServer.toLowerCase()) {
      case GIT_PROVIDER.GERRIT:
        updatedUrl.searchParams.set('a', 'tree');
        updatedUrl.searchParams.set('h', `refs/heads/${branch}`);
        break;
      case GIT_PROVIDER.GITHUB:
        updatedUrl.pathname += `/tree/${branch}`;
        break;
      case GIT_PROVIDER.GITLAB:
        updatedUrl.pathname += `/-/tree/${branch}`;
        break;
      case GIT_PROVIDER.BITBUCKET:
        updatedUrl.pathname += `/src/HEAD/`;
        updatedUrl.search = `?at=${encodeURIComponent(branch)}`;
        break;
      default:
        throw new Error(`Unsupported git server: ${gitServer}`);
    }

    return updatedUrl.toString();
  },
};
