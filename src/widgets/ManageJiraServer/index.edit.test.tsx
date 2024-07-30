/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { JiraCISecretMock } from '../../k8s/groups/default/Secret/mocks/jira-ci-secret.mock';
import { SecretKubeObjectInterface } from '../../k8s/groups/default/Secret/types';
import { JiraServerMock } from '../../k8s/groups/EDP/JiraServer/mocks/jira-server.mock';
import { JiraServerKubeObjectInterface } from '../../k8s/groups/EDP/JiraServer/types';
import { ManageJiraServer } from './index';

test('renders ManageJiraServer Edit component', () => {
  render(
    <TestWrapper>
      <ManageJiraServer
        secret={JiraCISecretMock as unknown as SecretKubeObjectInterface}
        jiraServer={JiraServerMock as JiraServerKubeObjectInterface}
        ownerReference={null}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
