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
import { ManageGitServer } from './index';

describe('testing ManageGitServer Create', () => {
  test('renders ManageGitServer component without gitserver and with ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          gitServer={null}
          webhookURL={null}
          repositorySecrets={[GithubCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            update: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            delete: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
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
          gitServer={null}
          webhookURL={null}
          repositorySecrets={[GitlabCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            update: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            delete: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
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
          gitServer={null}
          webhookURL={null}
          repositorySecrets={[GerritCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            update: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            delete: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
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
          gitServer={null}
          webhookURL={null}
          repositorySecrets={[]}
          handleClosePanel={() => {
            //
          }}
          permissions={{
            create: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            update: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            delete: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
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
          gitServer={null}
          webhookURL={null}
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
              },
              GitServer: {
                allowed: true,
              },
            },
            update: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
              },
            },
            delete: {
              Secret: {
                allowed: true,
              },
              GitServer: {
                allowed: true,
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
