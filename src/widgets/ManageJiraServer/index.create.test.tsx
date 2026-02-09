/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { ManageJiraServer } from './index';

test('renders ManageJiraServer Create component', () => {
  render(
    <TestWrapper>
      <ManageJiraServer
        secret={undefined}
        jiraServer={undefined}
        ownerReference={undefined}
        permissions={{
          create: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
            JiraServer: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          update: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
            JiraServer: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          delete: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
        }}
        handleClosePanel={jest.fn()}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
