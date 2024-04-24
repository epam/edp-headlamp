/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper } from '../../../mocks/wrappers/default';
import { FORM_MODES } from '../../types/forms';
import { ManageSSO } from './index';

test('renders ManageSSO Create component', () => {
  render(
    <TestWrapper>
      <ManageSSO
        formData={{
          ssoSecret: null,
          ownerReference: undefined,
          isReadOnly: false,
          mode: FORM_MODES.CREATE,
          handleClosePanel: jest.fn(),
        }}
      />
    </TestWrapper>
  );

  const dialog = screen.getByTestId('form');
  expect(dialog).toMatchSnapshot();
});
