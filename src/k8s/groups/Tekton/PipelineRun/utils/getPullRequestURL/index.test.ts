import { PipelineKubeObjectInterface } from '../../../Pipeline/types';
import { getPullRequestURL } from '.';

describe('testing getPullRequestURL function', () => {
  it('should return the correct URL for GitHub', () => {
    const pipelineRun = {
      spec: {
        params: [
          { name: 'git-source-url', value: 'git@github.com:user/test.git' },
          { name: 'changeNumber', value: '123' },
        ],
      },
      metadata: {
        labels: {
          'triggers.tekton.dev/trigger': 'github-trigger',
        },
      },
    };

    const result = getPullRequestURL(pipelineRun as unknown as PipelineKubeObjectInterface);

    expect(result).toBe('https://github.com/user/test/pull/123');
  });

  it('should return the correct URL for GitLab', () => {
    const pipelineRun = {
      spec: {
        params: [
          { name: 'git-source-url', value: 'git@my-gitlab-provider.com:user/test.git' },
          { name: 'changeNumber', value: '456' },
        ],
      },
      metadata: {
        labels: {
          'triggers.tekton.dev/trigger': 'gitlab-review',
        },
      },
    };

    const result = getPullRequestURL(pipelineRun as unknown as PipelineKubeObjectInterface);

    expect(result).toBe('https://my-gitlab-provider.com/user/test/merge_requests/456');
  });

  it('should return the correct URL for Bitbucket', () => {
    const pipelineRun = {
      spec: {
        params: [
          { name: 'git-source-url', value: 'git@my-bitbucket-provider.com:user/test.git' },
          { name: 'changeNumber', value: '456' },
        ],
      },
      metadata: {
        labels: {
          'triggers.tekton.dev/trigger': 'bitbucket-review',
        },
      },
    };

    const result = getPullRequestURL(pipelineRun as unknown as PipelineKubeObjectInterface);

    expect(result).toBe('https://my-bitbucket-provider.com/user/test/pull-requests/456');
  });

  it('should return null if gitSourceUrl or changeNumber is missing', () => {
    const pipelineRun = {
      spec: {
        params: [
          { name: 'git-source-url', value: 'git@github.com:user/test.git' },
          // changeNumber is missing
        ],
      },
      metadata: {
        labels: {
          'triggers.tekton.dev/trigger': 'github-trigger',
        },
      },
    };

    const result = getPullRequestURL(pipelineRun as unknown as PipelineKubeObjectInterface);

    expect(result).toBeNull();
  });

  it('should return null if gitSourceUrl includes "edp-ci"', () => {
    const pipelineRun = {
      spec: {
        params: [
          { name: 'git-source-url', value: 'https://example.com/edp-ci/repo.git' },
          { name: 'changeNumber', value: '789' },
        ],
      },
      metadata: {
        labels: {
          'triggers.tekton.dev/trigger': 'github-trigger',
        },
      },
    };

    const result = getPullRequestURL(pipelineRun as unknown as PipelineKubeObjectInterface);

    expect(result).toBeNull();
  });
});
