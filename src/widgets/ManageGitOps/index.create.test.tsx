/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { ManageGitOps } from './index';

test('renders ManageGitOps Create component', () => {
  render(
    <TestWrapper>
      <ManageGitOps
        formData={{
          currentElement: 'placeholder',
          handleClosePlaceholder: jest.fn(),
          permissions: {
            create: {
              Codebase: {
                allowed: true,
                reason: DEFAULT_ALLOWED_REASON,
              },
            },
            update: {},
            delete: {},
          },
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
