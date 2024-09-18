/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageDefectDojo } from './index';

test('renders ManageDefectDojo Create component', () => {
  render(
    <TestWrapper>
      <ManageDefectDojo
        secret={null}
        quickLink={null}
        ownerReference={null}
        mode={FORM_MODES.CREATE}
        permissions={{
          create: {
            Secret: {
              allowed: true,
            },
          },
          update: {
            QuickLink: {
              allowed: true,
            },
            Secret: {
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
