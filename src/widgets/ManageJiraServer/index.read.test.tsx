/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { JiraServerMock } from '../../k8s/JiraServer/mocks/jira-server.mock';
import { JiraServerKubeObjectInterface } from '../../k8s/JiraServer/types';
import { JiraCISecretWithOwnerMock } from '../../k8s/Secret/mocks/jira-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/Secret/types';
import { ManageJiraServer } from './index';

test('renders ManageJiraServer Edit component (read-only)', () => {
  const ownerReference = JiraCISecretWithOwnerMock.metadata.ownerReferences[0].kind;

  render(
    <TestWrapper>
      <ManageJiraServer
        secret={JiraCISecretWithOwnerMock as unknown as SecretKubeObjectInterface}
        jiraServer={JiraServerMock as JiraServerKubeObjectInterface}
        ownerReference={ownerReference}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
