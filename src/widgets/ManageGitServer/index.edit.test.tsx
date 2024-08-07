/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import {
  GerritCISecretWithOwnerMock,
  GithubCISecretWithOwnerMock,
  GitlabCISecretWithOwnerMock,
} from '../../k8s/groups/default/Secret/mocks/git-server-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import {
  gitServerGerritMock,
  gitServerGithubMock,
  gitServerGitlabMock,
} from '../../k8s/groups/EDP/GitServer/mocks/gitServer.mock';
import { GitServerKubeObjectInterface } from '../../k8s/groups/EDP/GitServer/types';
import { ManageGitServer } from './index';

describe('testing ManageGitServer Edit', () => {
  test('renders ManageGitServer component with Github gitserver and ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          webhookURL={'https://example.com'}
          gitServer={gitServerGithubMock as GitServerKubeObjectInterface}
          repositorySecrets={[GithubCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component with Gitlab gitserver and ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          webhookURL={'https://example.com'}
          gitServer={gitServerGitlabMock as GitServerKubeObjectInterface}
          repositorySecrets={[GitlabCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component with Gerrit gitserver and ci-github secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          webhookURL={'https://example.com'}
          gitServer={gitServerGerritMock as GitServerKubeObjectInterface}
          repositorySecrets={[GerritCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });

  test('renders ManageGitServer component with Gerrit gitserver without ci-secret', () => {
    render(
      <TestWrapper>
        <ManageGitServer
          webhookURL={'https://example.com'}
          gitServer={gitServerGerritMock as GitServerKubeObjectInterface}
          repositorySecrets={[GerritCISecretWithOwnerMock as unknown as SecretKubeObjectInterface]}
          handleClosePanel={() => {
            //
          }}
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });
});
