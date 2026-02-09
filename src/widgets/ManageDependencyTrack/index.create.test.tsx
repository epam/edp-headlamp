/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { DEFAULT_ALLOWED_REASON } from '../../providers/Permissions/constants';
import { FORM_MODES } from '../../types/forms';
import { ManageDependencyTrack } from './index';

test('renders ManageDependencyTrack Create component', () => {
  render(
    <TestWrapper>
      <ManageDependencyTrack
        secret={undefined}
        quickLink={undefined}
        ownerReference={undefined}
        mode={FORM_MODES.CREATE}
        permissions={{
          create: {
            Secret: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
          },
          update: {
            QuickLink: {
              allowed: true,
              reason: DEFAULT_ALLOWED_REASON,
            },
            Secret: {
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
