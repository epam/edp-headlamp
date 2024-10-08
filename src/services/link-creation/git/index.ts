import { GIT_PROVIDERS } from '../../../constants/gitProviders';
import { createURLObjectFromURLOrigin } from '../index';

export const GitURLService = {
  createGitOpsValuesYamlFileLink: (
    gitOpsWebUrl: string,
    pipelineName: string,
    stageName: string,
    appName: string,
    gitServer: GIT_PROVIDERS
  ) => {
    if (!gitOpsWebUrl) {
      return undefined;
    }

    const gitHostURLObject = createURLObjectFromURLOrigin(gitOpsWebUrl);

    if (gitServer === GIT_PROVIDERS.GERRIT) {
      gitHostURLObject.searchParams.append(
        'f',
        `${pipelineName}/${stageName}/${appName}-values.yaml`
      );
      gitHostURLObject.searchParams.append('hb', 'refs/heads/main');
      gitHostURLObject.searchParams.append('a', 'blob');

      return gitHostURLObject.href;
    } else if (gitServer === GIT_PROVIDERS.GITHUB || gitServer === GIT_PROVIDERS.GITLAB) {
      return `${gitHostURLObject.href}/blob/main/${pipelineName}/${stageName}/${appName}-values.yaml`;
    } else if (gitServer === GIT_PROVIDERS.BITBUCKET) {
      return `${gitHostURLObject.href}/src/main/${pipelineName}/${stageName}/${appName}-values.yaml`;
    }
  },
  createRepoBranchLink: (gitServer: GIT_PROVIDERS, baseUrl: string, branch: string) => {
    const updatedUrl = new URL(baseUrl);

    switch (gitServer.toLowerCase()) {
      case GIT_PROVIDERS.GERRIT:
        updatedUrl.searchParams.set('a', 'refs/heads/' + branch);
        break;
      case GIT_PROVIDERS.GITHUB:
        updatedUrl.pathname += `/tree/${branch}`;
        break;
      case GIT_PROVIDERS.GITLAB:
        updatedUrl.pathname += `/-/tree/${branch}`;
        break;
      case GIT_PROVIDERS.BITBUCKET:
        updatedUrl.pathname += `/src/${branch}`;
        break;
      default:
        throw new Error(`Unsupported git server: ${gitServer}`);
    }

    return updatedUrl.toString();
  },
};
