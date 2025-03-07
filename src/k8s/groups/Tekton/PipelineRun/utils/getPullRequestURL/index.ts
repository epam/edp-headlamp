import { GIT_PROVIDER } from '../../../../../../constants/gitProviders';
import { PipelineRunKubeObjectInterface } from '../../types';

export const getPullRequestURL = (pipelineRun: PipelineRunKubeObjectInterface): string | null => {
  if (!pipelineRun) {
    return null;
  }

  const hasParams = pipelineRun?.spec?.params?.length > 0;

  const gitSourceUrl =
    hasParams && pipelineRun?.spec?.params.find((el) => el.name === 'git-source-url')?.value;

  const changeNumber =
    hasParams && pipelineRun?.spec?.params.find((el) => el.name === 'changeNumber')?.value;

  const gitProvider = pipelineRun.metadata.labels?.['triggers.tekton.dev/trigger']?.split('-')?.[0];

  if (!gitSourceUrl || !changeNumber || !gitProvider) {
    return null;
  }

  const parts = gitSourceUrl.split(':');
  const host = parts[0].substring(4);
  const path = parts.slice(1).join('/').replace('.git', '');
  const url = new URL(`https://${host}/${path}`);

  if (gitSourceUrl.includes('edp-ci')) {
    // if gerrit
    return null;
  }

  switch (gitProvider) {
    case GIT_PROVIDER.GITHUB:
      url.pathname += `/pull/${changeNumber}`;
      break;
    case GIT_PROVIDER.GITLAB:
      url.pathname += `/merge_requests/${changeNumber}`;
      break;
    case GIT_PROVIDER.BITBUCKET:
      url.pathname += `/pull-requests/${changeNumber}`;
      break;
    default:
      break;
  }

  return url.href;
};
