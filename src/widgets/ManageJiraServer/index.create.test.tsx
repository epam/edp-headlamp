/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { ManageJiraServer } from './index';

test('renders ManageJiraServer Create component', () => {
  render(
    <TestWrapper>
      <ManageJiraServer
        secret={null}
        jiraServer={null}
        ownerReference={null}
        permissions={{
          create: {
            Secret: {
              allowed: true,
            },
            JiraServer: {
              allowed: true,
            },
          },
          update: {
            Secret: {
              allowed: true,
            },
            JiraServer: {
              allowed: true,
            },
          },
          delete: {
            Secret: {
              allowed: true,
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
