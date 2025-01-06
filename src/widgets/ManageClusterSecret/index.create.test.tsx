/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageClusterSecret } from './index';

test('renders ManageClusterSecret Create component', () => {
  render(
    <TestWrapper>
      <ManageClusterSecret
        formData={{
          handleClosePlaceholder: jest.fn(),
          mode: FORM_MODES.CREATE,
          permissions: {
            create: {
              Secret: {
                allowed: true,
              },
            },
            update: {
              Secret: {
                allowed: true,
              },
            },
            delete: {
              Secret: {
                allowed: true,
              },
            },
          },
          ownerReference: undefined,
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
