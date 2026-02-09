/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import {
  BitbucketCISecretWithOwnerMock,
  GerritCISecretWithOwnerMock,
  GithubCISecretWithOwnerMock,
  GitlabCISecretWithOwnerMock,
} from '../../k8s/groups/default/Secret/mocks/git-server-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { ManageGitServer } from './index';

describe('testing ManageGitServer Create', () => {
  test('renders ManageGitServer component without gitserver and with ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          gitServer={undefined}
          webhookURL={undefined}
          repositorySecrets={[GithubCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            delete: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component without gitserver and with ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          gitServer={undefined}
          webhookURL={undefined}
          repositorySecrets={[GitlabCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            delete: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component without gitserver and with ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          gitServer={undefined}
          webhookURL={undefined}
          repositorySecrets={[GerritCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            delete: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component without gitserver and without ci-secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          gitServer={undefined}
          webhookURL={undefined}
          repositorySecrets={[]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            delete: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component without gitserver and with ci-bitbucket secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          gitServer={undefined}
          webhookURL={undefined}
          repositorySecrets={[
            BitbucketCISecretWithOwnerMock as unknown as SecretKubeObjectInterface,
          ]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            delete: {
              Secret: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
              GitServer: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });
});
