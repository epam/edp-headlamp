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
} from '../../k8s/Secret/mocks/git-server-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
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
        />
      </TestWrapper>
    );

    const dialog = screen.getByTestId('form');
    expect(dialog).toMatchSnapshot();
  });
});
